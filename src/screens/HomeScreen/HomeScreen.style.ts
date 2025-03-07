import {StyleSheet} from 'react-native';
import {scaledSize, scaleHeight, scaleWidth} from '../../utils';

export const HomeScreenStyles = () =>
  StyleSheet.create({
    headerRight: {
      flexDirection: 'row',
      gap: 10,
    },
    userNameText: {fontSize: 20, fontWeight: 'bold'},
    button: {
      paddingVertical: scaleHeight(6),
      paddingHorizontal: scaleWidth(12),
      backgroundColor: '#007AFF',
      borderRadius: 6,
    },
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: '#007AFF',
      width: scaleHeight(60),
      height: scaleHeight(60),
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    floatingButtonText: {
      color: '#FFF',
      fontSize: scaledSize(30),
      fontWeight: 'bold',
    },
  });
