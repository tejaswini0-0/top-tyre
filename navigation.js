import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import Data from './Data';
import SensorData from './SensorData';
import TKPH from './TKPH';
import TemperatureChart from './TemperatureChart';
import PressureChart from './PressureChart';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: '#000000',
                    },
                    headerStyle: {
                        backgroundColor: '#af905e',
                    },
                }}
            >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Data" component={Data}/>
        <Stack.Screen name="SensorData" component={SensorData}/>
        <Stack.Screen name="TKPH" component={TKPH}/>
        <Stack.Screen name="TemperatureChart" component={TemperatureChart}/>
        <Stack.Screen name="PressureChart" component={PressureChart}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;