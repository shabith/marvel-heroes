import React, {useState, useEffect, useRef} from 'react';
import {View, ViewStyle, Dimensions, Text, TextStyle} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';

import {Colors, Typography} from '../config/theme';
import {AppearanceData, Marvel} from '../services/marvel';

const APPEARANCE_GRAPH: ViewStyle = {
  paddingRight: 40,
  marginVertical: 8,
  borderRadius: 10,
};

const LOADING: ViewStyle = {
  height: 220,
  backgroundColor: Colors.gray100,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 8,
};
const LOADING_TEXT: TextStyle = {
  fontFamily: Typography.fontFamily.bebasNeue,
  fontSize: Typography.fontSize.small,
  letterSpacing: 1.5,
};

type AppearanceGraphProps = {
  id: number;
};

const AppearanceGraph = ({id}: AppearanceGraphProps) => {
  const [appearanceData, setAppearanceData] = useState<AppearanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await Marvel.getAppearances(id, 10);
        if (isMounted.current) {
          setAppearanceData(data);
        }
      } catch (error) {
        if (__DEV__) {
          console.error(__DEV__);
        }
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: 'Trouble with connecting to the server',
          text2:
            'We are having trouble connecting to the Marvel server. Please try again later.',
        });
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [id]);
  return (
    <View>
      {loading ? (
        <View style={LOADING}>
          <Text style={LOADING_TEXT}>Loading...</Text>
        </View>
      ) : (
        <LineChart
          data={{
            labels: appearanceData.map(i => i.year.toString().substr(-2)), // to get the last 2 digits of the year
            datasets: [
              {
                data: appearanceData.map(i => i.value),
              },
            ],
          }}
          width={Dimensions.get('window').width - 30} // from react-native
          height={220}
          xAxisLabel="'"
          withOuterLines={false}
          yAxisInterval={1}
          chartConfig={{
            propsForBackgroundLines: {
              stroke: Colors.gray300,
            },
            backgroundColor: Colors.gray100,
            backgroundGradientFrom: Colors.gray100,
            backgroundGradientTo: Colors.gray100,
            decimalPlaces: 0,
            color: () => Colors.primary,
            labelColor: () => Colors.gray800,
            style: {
              borderRadius: 5,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: Colors.primary,
            },
          }}
          style={APPEARANCE_GRAPH}
        />
      )}
    </View>
  );
};

export default AppearanceGraph;
