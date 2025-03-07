import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {route} from './constants';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {navigationRef} from './NavigationService';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import CreateEvent from '../screens/CreateEvent/CreateEvent';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name={route.LOGIN} component={LoginScreen} />
        <Stack.Screen name={route.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={route.SIGN_UP_SCREEN} component={SignUpScreen} />
        <Stack.Screen name={route.FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={route.CREATE_EVENT} component={CreateEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
