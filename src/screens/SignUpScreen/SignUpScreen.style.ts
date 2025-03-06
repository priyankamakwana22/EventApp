import {StyleSheet} from 'react-native';
import {
  moderateScale,
  Palette,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '../../utils';

export const SignUpStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: moderateScale(20),
      backgroundColor: '#f5f5f5',
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
    errorText: {color: 'red', marginTop: 10},
    buttonStyle: {marginVertical: moderateScale(25)},
  });
