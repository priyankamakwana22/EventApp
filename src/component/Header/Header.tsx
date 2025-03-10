import React from 'react';
import {Pressable, View} from 'react-native';
import {headerStyles} from './Header.style';

interface HeaderProps {
  leftComponent?: React.ReactNode;
  bodyComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onPressRight?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  leftComponent,
  bodyComponent,
  rightComponent,
  onPressRight,
}) => {
  const styles = headerStyles();
  return (
    <View style={styles.container}>
      <View>{leftComponent}</View>
      <View>{bodyComponent}</View>
      <Pressable style={styles.pressableView} onPress={onPressRight}>
        {rightComponent}
      </Pressable>
    </View>
  );
};

export default React.memo(Header);
