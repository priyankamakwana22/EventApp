import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils';

export const headerStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pressableView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(5),
      paddingVertical: moderateScale(2),
      borderRadius: 5,
    },
  });
