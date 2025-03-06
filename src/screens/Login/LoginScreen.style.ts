import {StyleSheet} from 'react-native';
import {
  moderateScale,
  Palette,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '../../utils';

export const loginStyles = () =>
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
    errorText: {color: 'red', marginTop: scaledSize(10)},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
