import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize, scaleWidth} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const buttonStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(20),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: scaleWidth(120),
    },
    contained: {
      backgroundColor: theme.backgroundColor,
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.backgroundColor,
      backgroundColor: 'transparent',
    },
    pressed: {
      opacity: 0.7,
    },
    text: {
      fontSize: scaledSize(16),
      fontWeight: 'bold',
      color: theme.backgroundColor,
    },
    outlinedText: {
      color: theme.primaryColor,
    },
  });
