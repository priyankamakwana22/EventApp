import React from 'react';
import {Text, View, Pressable, SafeAreaView, Alert} from 'react-native';
import {HomeScreenStyles} from './HomeScreen.style';
import Header from '../../component/Header/Header';
import {navigate} from '../../navigation/NavigationService';
import {route} from '../../navigation/constants';
import {useTheme} from '../../utils/Theme/useTheme';
import {strings} from '../../utils/strings';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../../utils/storageKeys';

const HomeScreen = () => {
  const {theme} = useTheme();
  const styles = HomeScreenStyles(theme);

  const onPressSync = () => {
    console.log('Sync events');
  };

  const onPressLogout = () => {
    console.log('Logout');
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          navigate(route.LOGIN);
          AsyncStorage.setItem(StorageKeys.IS_LOGGED_IN, 'false');
        },
      },
    ]);
  };

  const onPressAddEvent = () => {
    navigate(route.CREATE_EVENT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={<Text style={styles.userNameText}>{'Username'}</Text>}
        rightComponent={
          <View style={styles.headerRight}>
            <Pressable onPress={onPressSync} style={styles.button}>
              <Text style={styles.buttonText}>{strings.SYNC}</Text>
            </Pressable>
            <Pressable onPress={onPressLogout} style={styles.button}>
              <Text style={styles.buttonText}>{strings.LOG_OUT}</Text>
            </Pressable>
          </View>
        }
      />

      <Pressable style={styles.floatingButton} onPress={onPressAddEvent}>
        <Icon size={24} color={theme.iconColor} name="plus" />
      </Pressable>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
