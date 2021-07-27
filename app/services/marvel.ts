import {API_URL, API_PRIVATE_KEY, API_PUBLIC_KEY} from 'react-native-dotenv';
import {MD5} from 'react-native-crypto-js';

export type AppearanceData = {year: number; value: number};

type APIResponse<T = any> = {
  code: number | string;
  data?: {
    count: number;
    limit: number;
    total: number;
    offset: number;
    results: T;
  };
};

export const Marvel = {
  getParams(offset?: number, limit?: number): string {
    const timestamp = +new Date();
    const hash = MD5(`${timestamp}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
    let params = `apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`;
    if (offset) {
      params += `&offset=${offset}`;
    }
    if (limit) {
      params += `&limit=${limit}`;
    }
    return params;
  },

  async getCharacters(offset?: number, limit?: number): Promise<APIResponse> {
    const params = this.getParams(offset, limit);
    const url = `${API_URL}/characters?${params}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  },

  async getComics(
    id: number,
    offset?: number,
    limit?: number,
  ): Promise<APIResponse> {
    const params = this.getParams(offset, limit);
    const url = `${API_URL}/characters/${id}/comics?${params}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  },

  async getAppearances(
    id: number,
    numberOfYears: number,
  ): Promise<AppearanceData[]> {
    const params = this.getParams();
    const appearancePromises: Promise<any>[] = [];
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let k = 0; k < numberOfYears; k++) {
      const startYear = currentYear - k;
      years.push(startYear);
      const url = `${API_URL}/characters/${id}/comics?${params}&startYear=${startYear}`;
      const promise = fetch(url);
      appearancePromises.push(promise);
    }

    const response = await Promise.all(appearancePromises);
    const dataset = await Promise.all(response.map(res => res.json()));
    const data: AppearanceData[] = dataset.map((item, index) => ({
      year: years[index],
      value: item.data.total,
    }));
    return data;
  },
};
