import {StyleSheet} from 'react-native';
import {Palette} from '../../utils';

export const buttonStyles = () =>
  StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
    },
    contained: {
      backgroundColor: '#6200ee',
    },
    outlined: {
      borderWidth: 1,
      borderColor: '#6200ee',
      backgroundColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
    },
    pressed: {
      opacity: 0.7,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff', // Default text color for contained
    },
    outlinedText: {
      color: '#6200ee',
    },
  });
