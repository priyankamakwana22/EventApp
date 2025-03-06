import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils';

export const headerStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(20),
    },
    pressableView: {
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5,
    },
    left: {},
    body: {},
    right: {},
  });
