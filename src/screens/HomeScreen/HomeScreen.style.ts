import {StyleSheet} from 'react-native';
import {moderateScale, scaledSize, scaleHeight, scaleWidth} from '../../utils';
import {Theme} from '../../utils/Theme/themeTypes';

export const HomeScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
    card: {
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 10,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      position: 'relative',
    },
    eventImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    moreImagesBadge: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
    },
    moreImagesText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    eventDetails: {
      paddingTop: 8,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    eventText: {
      fontSize: 14,
      color: 'gray',
      marginTop: 2,
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.primaryColor,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },

    // container: {flex: 1},
    headerRight: {
      flexDirection: 'row',
    },
    userNameText: {
      color: theme.textColor,
      marginHorizontal: 5,
      fontSize: scaledSize(20),
      fontWeight: 'bold',
    },
    button: {
      paddingVertical: scaleHeight(6),
      paddingHorizontal: scaleWidth(12),
      // backgroundColor: theme.primaryColor,
      borderRadius: 6,
    },
    buttonText: {
      color: theme.iconColor,
      fontWeight: 'bold',
    },
    floatingButtonText: {
      color: theme.backgroundColor,
      fontSize: scaledSize(30),
      fontWeight: 'bold',
    },
    deleteButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      padding: 6,
      alignItems: 'center',
      justifyContent: 'center',
      height: scaleHeight(50),
      width: scaleHeight(50),
      borderRadius: scaleHeight(25),
    },
  });
