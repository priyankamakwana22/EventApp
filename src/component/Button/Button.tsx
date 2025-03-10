import React from 'react';
import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {buttonStyles} from './Button.style';
import {useTheme} from '../../utils/Theme/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  mode?: 'contained' | 'outlined' | 'text';
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  mode = 'contained',
  style,
}) => {
  const {theme} = useTheme();
  const styles = buttonStyles(theme);
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        styles[mode],
        pressed && styles.pressed,
        style,
      ]}>
      <Text style={[styles.text, mode === 'outlined' && styles.outlinedText]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default React.memo(CustomButton);
