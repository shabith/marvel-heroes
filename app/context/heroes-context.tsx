import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
import {parseISO} from 'date-fns';
import Toast from 'react-native-toast-message';

import {HeroBasicInfo} from '../types/hero';
import {Marvel} from '../services/marvel';

type HeroesProviderValueType = {
  hero: HeroBasicInfo | null;
  heroes: HeroBasicInfo[];
  loading: boolean;
  loadMore: () => void;
  setHero: (id: number) => void;
  filterHeroes: (value: string) => void;
  isFiltering: boolean;
  clearSearch: () => void;
  meta: {
    limit: number;
    offset: number;
    total: number;
    count: number;
  };
};

const HeroesContext = createContext<HeroesProviderValueType>(
  {} as HeroesProviderValueType,
);

const useProviderHeroes = (): HeroesProviderValueType => {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState<HeroBasicInfo | null>(null);
  const [initialHeroes, setInitialHeroes] = useState<HeroBasicInfo[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [heroes, setHeroes] = useState<HeroBasicInfo[]>([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 20;

  const setCurrentHero = (id: number) => {
    if (heroes) {
      const currentHero = heroes.find(h => h.id === id);
      if (currentHero) {
        setHero(currentHero);
      }
    }
  };

  const clearSearch = () => {
    setHeroes(initialHeroes);
    setIsFiltering(false);
  };

  const filterHeroes = async (value: string) => {
    setIsFiltering(true);
    const filteredHeroes = initialHeroes
      .slice()
      .filter(curHero =>
        curHero.name.toLowerCase().includes(value.toLowerCase()),
      );
    setHeroes([...filteredHeroes]);
  };

  const loadMore = async () => {
    if (!loading) {
      setOffset(currentOffset => currentOffset + limit);
    }
  };

  // get all heroes
  const loadHeroes = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Marvel.getCharacters(offset, limit);

      if (results.code === 200) {
        if (results.data) {
          setOffset(results.data.offset);
          setCount(results.data.count);
          setTotal(results.data.total);

          if (results.data.results) {
            const newHeroes: HeroBasicInfo[] = results.data.results.map(
              (rawHeroes: any) =>
                ({
                  id: rawHeroes.id,
                  name: rawHeroes.name,
                  description: rawHeroes.description,
                  date: parseISO(rawHeroes.modified),
                  thumbnail: `${rawHeroes.thumbnail.path.replace(
                    'http://',
                    'https://',
                  )}.${rawHeroes.thumbnail.extension}`,
                  detailUrl: rawHeroes.urls.find(
                    (url: {type: string; url: string}) => url.type === 'detail',
                  ).url,
                } as HeroBasicInfo),
            );
            setHeroes(currentHeroes => {
              setInitialHeroes([...currentHeroes, ...newHeroes]);
              return [...currentHeroes, ...newHeroes];
            });
          }
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      if (__DEV__) {
        console.error(error);
      }
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: 'Trouble with connecting to the server',
        text2:
          'We are having trouble connecting to the Marvel server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  return {
    loading,
    hero,
    heroes,
    filterHeroes,
    setHero: setCurrentHero,
    isFiltering,
    loadMore,
    clearSearch,
    meta: {
      limit,
      offset,
      count,
      total,
    },
  };
};

export const HeroesProvider: React.FC = ({children}) => {
  const heroes = useProviderHeroes();
  return (
    <HeroesContext.Provider value={heroes}>{children}</HeroesContext.Provider>
  );
};

export const useHeroes = (): HeroesProviderValueType =>
  useContext(HeroesContext);
