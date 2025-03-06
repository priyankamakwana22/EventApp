import React from 'react';
import {Text, View} from 'react-native';
import {HomeScreenStyles} from './HomeScreen.style';
import Header from '../../component/Header/Header';

interface ButtonProps {}

const HomeScreen: React.FC<ButtonProps> = ({}) => {
  const styles = HomeScreenStyles();
  const onPressSync = () => {
    console.log('Sync events');
  };

  return (
    <View style={{paddingVertical: 16}}>
      <Header
        leftComponent={<Text style={{fontSize: 20}}>{'Username'}</Text>}
        rightComponent={<Text style={{fontSize: 20}}>{'Sync Events'}</Text>}
        onPressRight={onPressSync}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
