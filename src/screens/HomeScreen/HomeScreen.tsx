import React from 'react';
import {Text, View, Pressable, SafeAreaView} from 'react-native';
import {HomeScreenStyles} from './HomeScreen.style';
import Header from '../../component/Header/Header';
import {navigate} from '../../navigation/NavigationService';
import {route} from '../../navigation/constants';
import {useTheme} from '../../utils/Theme/useTheme';
import {strings} from '../../utils/strings';

const HomeScreen = () => {
  const {theme} = useTheme();
  const styles = HomeScreenStyles(theme);

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
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
