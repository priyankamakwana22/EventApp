import React from 'react';
import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {buttonStyles} from './Button.style';
import {color} from '../../utils';

interface ButtonProps {
  title: string;
  onPress: () => void;
  mode?: 'contained' | 'outlined' | 'text'; // Default is "contained"
  style?: StyleProp<ViewStyle>; // Allows custom styles
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  mode = 'contained',
  style,
}) => {
  const styles = buttonStyles();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        styles[mode], // Apply mode-specific styles
        pressed && styles.pressed, // Apply pressed state effect
        style,
      ]}>
      <Text style={[styles.text, mode === 'outlined' && styles.outlinedText]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default React.memo(CustomButton);
