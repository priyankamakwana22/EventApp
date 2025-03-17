import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {route} from './constants';
import {navigationRef} from './NavigationService';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import CreateEvent from '../screens/CreateEvent/CreateEvent';
import {StorageKeys} from '../utils/storageKeys';
import {ActivityIndicator, View} from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem(StorageKeys.IS_LOGGED_IN);
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error('Error fetching login status:', error);
        setIsLoggedIn(false);
      } finally {
        setAuthLoaded(true);
      }
    };
    checkLoginStatus();
  }, []);

  if (!authLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name={route.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={route.CREATE_EVENT} component={CreateEvent} />
            <Stack.Screen name={route.LOGIN} component={LoginScreen} />
            <Stack.Screen
              name={route.SIGN_UP_SCREEN}
              component={SignUpScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={route.LOGIN} component={LoginScreen} />
            <Stack.Screen
              name={route.SIGN_UP_SCREEN}
              component={SignUpScreen}
            />
            <Stack.Screen name={route.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={route.CREATE_EVENT} component={CreateEvent} />
            <Stack.Screen
              name={route.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
