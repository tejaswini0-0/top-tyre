import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';

const Stack = createStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
