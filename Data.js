import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [data, setData] = useState('0'); // Initial data state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the ESP32 server every 1 second
    const intervalId = setInterval(() => {
      fetch('http://192.168.156.6/get-data') // Replace with your ESP32 IP address
        .then((response) => response.text())
        .then((result) => {
          setData(result.trim()); // Update state with received data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, 1000); // Fetch every second

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      {loading ? <Text>Loading...</Text> : <Text>Button State: {data}</Text>}
    </View>
  );
};

export default App;