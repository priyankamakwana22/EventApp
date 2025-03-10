import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const loginStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: moderateScale(20),
      backgroundColor: theme.backgroundColor,
    },
    card: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(50),
    },
    title: {
      textAlign: 'center',
      marginBottom: moderateScale(20),
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      marginBottom: moderateScale(10),
      textAlign: 'right',
      fontWeight: 'bold',
      color: theme.linkColor,
    },
    errorText: {color: theme.errorColor, marginTop: scaledSize(10)},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
