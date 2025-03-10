import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize, scaleHeight, scaleWidth} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const HomeScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {flex: 1},
    headerRight: {
      flexDirection: 'row',
      gap: moderateScale(10),
    },
    userNameText: {fontSize: scaledSize(20), fontWeight: 'bold'},
    button: {
      paddingVertical: scaleHeight(6),
      paddingHorizontal: scaleWidth(12),
      backgroundColor: theme.primaryColor,
      borderRadius: 6,
    },
    buttonText: {
      color: theme.primaryColor,
      fontWeight: 'bold',
    },
    floatingButton: {
      position: 'absolute',
      bottom: scaleHeight(30),
      right: scaleHeight(20),
      backgroundColor: theme.primaryColor,
      width: scaleHeight(60),
      height: scaleHeight(60),
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    floatingButtonText: {
      color: theme.backgroundColor,
      fontSize: scaledSize(30),
      fontWeight: 'bold',
    },
  });
