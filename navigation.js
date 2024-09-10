import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;