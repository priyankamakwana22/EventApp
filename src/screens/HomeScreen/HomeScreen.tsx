import React from 'react';
import {Text, View, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import {HomeScreenStyles} from './HomeScreen.style';
import Header from '../../component/Header/Header';
import {navigate} from '../../navigation/NavigationService';
import {route} from '../../navigation/constants';

const HomeScreen = () => {
  const styles = HomeScreenStyles();

  const onPressSync = () => {
    console.log('Sync events');
  };

  const onPressLogout = () => {
    console.log('Logout');
  };

  const onPressAddEvent = () => {
    navigate(route.CREATE_EVENT);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftComponent={<Text style={styles.userNameText}>{'Username'}</Text>}
        rightComponent={
          <View style={styles.headerRight}>
            <Pressable onPress={onPressSync} style={styles.button}>
              <Text style={styles.buttonText}>Sync</Text>
            </Pressable>
            <Pressable onPress={onPressLogout} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        }
      />

      <Pressable style={styles.floatingButton} onPress={onPressAddEvent}>
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
