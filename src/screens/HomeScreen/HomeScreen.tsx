import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import {navigate} from '../../navigation/NavigationService';
import {route} from '../../navigation/constants';
import {useTheme} from '../../utils/Theme/useTheme';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../../component/Header/Header';
import {HomeScreenStyles} from './HomeScreen.style';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../../utils/storageKeys';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const {theme} = useTheme();
  const styles = HomeScreenStyles(theme);
  const [username, setUsername] = useState<string | null>(null);
  const events = useSelector(state => state.event);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUsername(user.displayName || 'Guest');
      } else {
        setUsername(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const onPressSync = () => {
    console.log('Sync events');
  };

  const onPressLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        onPress: async () => {
          const auth = getAuth();
          await auth.signOut();
          await AsyncStorage.setItem(StorageKeys.IS_LOGGED_IN, 'false');
          navigate(route.LOGIN);
        },
      },
    ]);
  };

  const onPressAddEvent = () => {
    navigate(route.CREATE_EVENT);
  };

  // Sort events by date (latest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  // Render Event Card
  const renderEventCard = ({item}) => {
    const moreImagesCount = item.images.length - 1;

    return (
      <View style={styles.card}>
        {/* Show First Image */}
        {item.images.length > 0 && (
          <View style={styles.imageContainer}>
            <Image source={{uri: item.images[0]}} style={styles.eventImage} />

            {/* Show "+X more" if there are more images */}
            {moreImagesCount > 0 && (
              <View style={styles.moreImagesBadge}>
                <Text style={styles.moreImagesText}>
                  +{moreImagesCount} more
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventText}>
            {item.city}, {item.state}, {item.country}
          </Text>
          <Text style={styles.eventText}>
            Date: {item.date} | Time: {item.time}
          </Text>
          <Text style={styles.eventText}>Attendees: {item.attendees}</Text>
          <Text style={styles.eventText}>Description: {item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={
          <Text style={styles.userNameText}>{username || 'Guest'}</Text>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <Pressable
              onPress={onPressSync}
              style={[styles.button, {flexDirection: 'row'}]}>
              <Icons name="sync" size={24} color={theme.primaryColor} />
              <Entypo name="dot-single" size={24} color={theme.primaryColor} />
            </Pressable>
            <Pressable onPress={onPressLogout} style={styles.button}>
              <Icons name="logout" size={24} color={theme.primaryColor} />
            </Pressable>
          </View>
        }
      />

      {/* Event List */}
      <FlatList
        data={sortedEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add Event Button */}
      <Pressable style={styles.floatingButton} onPress={onPressAddEvent}>
        <Icon size={24} color={theme.iconColor} name="plus" />
      </Pressable>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
