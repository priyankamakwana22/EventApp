import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';
import {inputStyles} from './Input.style';
import {useTheme} from '../../utils/Theme/useTheme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
}) => {
  const styles = inputStyles();
  const {theme} = useTheme();

  return (
    <TextInput
      label={label}
      value={value}
      placeholderTextColor={theme.textColor}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

export default React.memo(Input);
