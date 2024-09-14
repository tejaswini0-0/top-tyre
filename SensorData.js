import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { database, auth } from './config/firebase';
import { ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SensorDataScreen() {
    const [temperature, setTemperature] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            console.log("Logged-in user ID:", userId);

            // Firebase Realtime Database reference to user's temperature data
            const temperatureRef = ref(database, `UsersData/${userId}/temperature`);

            // Fetch the latest temperature data
            const fetchTemperature = () => {
                onValue(temperatureRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log("Fetched data from Firebase:", data);  // Debugging log to verify data

                    if (data) {
                        // Retrieve and sort the timestamps in descending order
                        const timestamps = Object.keys(data);
                        if (timestamps.length > 0) {
                            const sortedTimestamps = timestamps.sort((a, b) => b - a);  // Sort by latest timestamp
                            const mostRecentTimestamp = sortedTimestamps[0];  // Get the latest timestamp
                            const mostRecentEntry = data[mostRecentTimestamp];  // Retrieve the latest entry
                            setTemperature(mostRecentEntry.temperature);  // Set the latest temperature value
                        } else {
                            setError("No temperature data available.");
                        }
                    } else {
                        setError("No data found for this user.");
                    }
                }, (errorObject) => {
                    setError("Failed to fetch data: " + errorObject.message);  // Handle errors
                });
            };

            fetchTemperature();

            const interval = setInterval(fetchTemperature, 5000);

            return () => clearInterval(interval);
        } else {
            setError("No user is logged in.");
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Latest Temperature Reading</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.cellHeader}>Temperature</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>
                        {temperature ? `${temperature}°C` : error ? error : 'No data'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d3d3d',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#af905e',
        textAlign: 'center',
        marginBottom: 20,
    },
    table: {
        backgroundColor: '#af905e',
        padding: 10,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    cellHeader: {
        fontWeight: '700',
        color: '#000000',
        fontSize: 18,
    },
    cell: {
        color: '#000000',
        fontSize: 16,
    },
});
