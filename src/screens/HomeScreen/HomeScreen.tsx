import React, {useEffect, useState, useMemo, useCallback} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {deleteEvent} from '../../redux/slices/eventSlice';
import {strings} from '../../utils/strings';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const {theme} = useTheme();
  const styles = HomeScreenStyles(theme);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const [hasUnsyncedEvents, setHasUnsyncedEvents] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user?.uid !== userId) {
        setUserId(user?.uid || null);
        setUsername(user ? user.displayName || 'Guest' : null);
      }
    });
    return unsubscribe;
  }, [userId]);

  // ✅ Fix: Ensure events exist to avoid state errors
  const events = useSelector(state => state.event?.[userId] ?? []);

  const eventList = useMemo(() => events, [events]);

  const checkUnsyncedEvents = useCallback(async () => {
    if (!userId || eventList.length === 0) {
      setHasUnsyncedEvents(false);
      return;
    }

    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('events')
        .get();

      const firestoreEvents = snapshot.docs.map(doc => doc.id);
      const unsynced = eventList.some(
        event => !firestoreEvents.includes(event.id),
      );

      setHasUnsyncedEvents(prev => (prev !== unsynced ? unsynced : prev));
    } catch (error) {
      console.error('Error checking unsynced events:', error);
      setHasUnsyncedEvents(false);
    }
  }, [userId]);

  useEffect(() => {
    checkUnsyncedEvents();
  }, []);

  const saveEventsToFirestore = async () => {
    if (!userId) return;

    try {
      const userEventsRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('events');

      for (const event of eventList) {
        if (!event.id) continue;
        await userEventsRef.doc(event.id).set(event);
      }
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const onPressSync = async () => {
    if (eventList.length === 0) {
      Alert.alert('Sync', 'No events to sync.');
      return;
    }
    try {
      await saveEventsToFirestore();
      Alert.alert('Sync', 'All events have been synced successfully!');
      setHasUnsyncedEvents(false);
    } catch (error) {
      Alert.alert('Sync Failed', 'Could not sync events.');
    }
  };

  const onPressLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        onPress: async () => {
          await getAuth().signOut();
          await AsyncStorage.setItem(StorageKeys.IS_LOGGED_IN, 'false');
          navigate(route.LOGIN);
        },
      },
    ]);
  };

  const handleDeleteEvent = eventId => {
    dispatch(deleteEvent(eventId));
    setHasUnsyncedEvents(true);
  };

  const renderEventCard = useCallback(
    ({item}) => (
      <View style={styles.card}>
        {item.images?.length > 0 && (
          <View style={styles.imageContainer}>
            <Image source={{uri: item.images[0]}} style={styles.eventImage} />
            {item.images.length > 1 && (
              <View style={styles.moreImagesBadge}>
                <Text style={styles.moreImagesText}>
                  +{item.images.length - 1} more
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
          <Text style={styles.eventText}>
            {strings.NUMBER_OF_ATTENDEES} {item.attendees}
          </Text>
          <Text style={styles.eventText}>Description: {item.description}</Text>
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDeleteEvent(item.id)}>
          <Icons name="delete" size={20} color="red" />
        </Pressable>
      </View>
    ),
    [eventList],
  );

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
              {hasUnsyncedEvents && (
                <Entypo
                  name="dot-single"
                  size={24}
                  color={theme.primaryColor}
                />
              )}
            </Pressable>
            <Pressable onPress={onPressLogout} style={styles.button}>
              <Icons name="logout" size={24} color={theme.primaryColor} />
            </Pressable>
          </View>
        }
      />
      <FlatList
        data={eventList}
        keyExtractor={item => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContainer}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => navigate(route.CREATE_EVENT)}>
        <Icon size={24} color={theme.iconColor} name="plus" />
      </Pressable>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
