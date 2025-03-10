import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const SignUpStyles = (theme: Theme) =>
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
    errorText: {color: theme.errorColor, marginTop: moderateScale(10)},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
