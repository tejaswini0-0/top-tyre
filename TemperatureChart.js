import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { database } from './config/firebase';
import { ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const TemperatureChart = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperatureData = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        console.log("Logged-in user ID:", userId);

        const temperatureRef = ref(database, `UsersData/${userId}/temperature`);

        onValue(
          temperatureRef,
          (snapshot) => {
            const data = snapshot.val();
            console.log("Fetched data from Firebase:", data);

            if (data) {
              const tempData = [];
              const tempLabels = [];

              if (typeof data === 'object') {
                const timestamps = Object.keys(data);
                if (timestamps.length > 0) {
                  const sortedTimestamps = timestamps.sort((a, b) => b - a);
                  const recentTimestamps = sortedTimestamps.slice(0, 10);

                  recentTimestamps.forEach((timestamp) => {
                    const entry = data[timestamp];
                    console.log("Processing entry:", entry);

                    if (entry && entry.temperature) {
                      const date = new Date(parseInt(timestamp) * 1000);
                      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                      tempLabels.push(formattedTime);
                      tempData.push(parseFloat(entry.temperature));
                    } else {
                      console.log("Entry or temperature field is missing:", entry);
                    }
                  });

                  if (tempData.length > 0) {
                    setTemperatureData(tempData);
                    setLabels(tempLabels);
                    setError(null);
                  } else {
                    setError('No temperature data available.');
                  }
                } else {
                  setError('No temperature data available.');
                }
              } else {
                setError('Data format is incorrect.');
              }
            } else {
              setError('No data found for this user.');
            }
            setLoading(false);
          },
          (errorObject) => {
            setError("Failed to fetch data: " + errorObject.message);
            setLoading(false);
          }
        );
      } else {
        setError("No user is logged in.");
        setLoading(false);
      }
    };

    fetchTemperatureData();
    const interval = setInterval(fetchTemperatureData, 60000);
    return () => clearInterval(interval);
  }, []);

  const limitedLabels = labels.slice(-10);
  const limitedData = temperatureData.slice(-10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature Over Time</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffa726" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : limitedData.length > 0 ? (
        <ScrollView horizontal style={styles.scrollContainer}>
          <LineChart
            data={{
              labels: limitedLabels,
              datasets: [
                {
                  data: limitedData,
                },
              ],
            }}
            width={Dimensions.get('window').width * 1.2}
            height={250}
            yAxisLabel=""
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                marginLeft: 2,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              yAxis: {
                min: 20,
                max: 50,
              },
              propsForLabels: {
                rotation: 0,
                textAnchor: 'middle',
              },
            }}
            bezier
            style={styles.chart}
          />
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center' }}>No temperature data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    width: Dimensions.get('window').width * 1.2,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default TemperatureChart;
