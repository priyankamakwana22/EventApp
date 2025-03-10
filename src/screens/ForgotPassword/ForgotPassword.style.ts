import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const forgotPasswordStyles = (theme: Theme) =>
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
    subTitle: {
      marginBottom: moderateScale(20),
      fontWeight: 'bold',
    },
    backToLoginText: {
      marginBottom: moderateScale(10),
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'blue',
    },
    errorText: {color: theme.errorColor, marginTop: scaledSize(10)},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
