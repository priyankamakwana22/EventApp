import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize} from '../../utils';

export const forgotPasswordStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    card: {
      paddingHorizontal: 20,
      paddingVertical: 50,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
    },
    subTitle: {
      marginBottom: 20,
      fontWeight: 'bold',
    },
    backToLoginText: {
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'blue',
    },
    errorText: {color: 'red', marginTop: scaledSize(10)},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
