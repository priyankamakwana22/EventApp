import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import {CreateEventStyles} from './CreateEvent.style';
import {useTheme} from '../../utils/Theme/useTheme';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../component/Button/Button';
import {strings} from '../../utils/strings';
import Header from '../../component/Header/Header';
import {goBack, navigate} from '../../navigation/NavigationService';
import {cities, countries, states} from '../../utils/data';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {addEvent, setFormData} from '../../redux/slices/eventSlice';
import {route} from '../../navigation/constants';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

interface FormState {
  name: string;
  date: Date;
  time: Date;
  country: string;
  state: string;
  city: string;
  images: string[];
  attendees: string;
  description: string;
}

const CreateEvent: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    date: new Date(),
    time: new Date(),
    country: '',
    state: '',
    city: '',
    images: [],
    attendees: '',
    description: '',
  });

  const dispatch = useDispatch();

  const {theme} = useTheme();
  const styles = CreateEventStyles(theme);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  console.log('🚀 ~ HomeScreen ~ userId:', userId);
  const handleChange = (key: keyof FormState, value: any) => {
    setForm(prevForm => ({...prevForm, [key]: value}));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUserId(user ? user.uid : null);
    });
    return unsubscribe;
  }, []);

  const handleCountryChange = (item: {label: string}) => {
    handleChange('country', item.label);
    handleChange('state', '');
    handleChange('city', '');
  };

  const selectedCountry = useMemo(
    () => countries.find(c => c.label === form.country),
    [form.country],
  );

  const selectedState = useMemo(
    () =>
      selectedCountry
        ? states[selectedCountry.value].find(s => s.label === form.state)
        : null,
    [selectedCountry, form.state],
  );

  const selectedCity = useMemo(
    () =>
      selectedState
        ? cities[selectedState.value].find(c => c.label === form.city)
        : null,
    [selectedState, form.city],
  );

  const handleStateChange = (item: {value: string}) => {
    handleChange('state', item.label);
    handleChange('city', '');
  };

  const handleCityChange = (item: {value: string}) => {
    handleChange('city', item.label);
  };

  const pickImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map(asset => asset.uri);
        handleChange('images', [...form.images, ...newImages]);
      }
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    handleChange('images', updatedImages);
  };

  const validateEventData = event => {
    const nameRegex = /^[a-zA-Z0-9 ]+$/; // Only allows letters, numbers, and spaces
    const numberRegex = /^[0-9]+$/; // Only allows numbers
    const currentDate = new Date(); // Get current date & time

    if (!nameRegex.test(event.name)) {
      Alert.alert('Invalid Name', 'Event name should not contain symbols.');
      return false;
    }

    if (!nameRegex.test(event.description)) {
      Alert.alert(
        'Invalid Description',
        'Event description should not contain symbols.',
      );
      return false;
    }

    const eventDateTime = new Date(event.date + 'T' + event.time);
    if (eventDateTime <= currentDate) {
      Alert.alert('Invalid Date/Time', 'Event cannot be in the past.');
      return false;
    }

    if (!numberRegex.test(event.attendees)) {
      Alert.alert(
        'Invalid Attendees',
        'Number of attendees should be a valid number.',
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!userId) {
      Alert.alert('Error', 'User not identified.');
      return;
    }

    if (!validateEventData(form)) {
      return;
    }

    dispatch(addEvent({...form, userId}));
    navigate(route.HOME_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={
          <Pressable style={styles.leftView} onPress={() => goBack()}>
            <Ionicons size={18} color={theme.textColor} name="chevron-back" />
          </Pressable>
        }
        bodyComponent={
          <Text style={styles.header}>{strings.CREATE_EVENT}</Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>{strings.NAME_OF_THE_EVENT}</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />
        <View style={styles.dateTimeContainer}>
          <View>
            <Text style={styles.label}>{strings.DATE}</Text>
            <Pressable
              style={styles.dateView}
              onPress={() => setOpenDate(true)}>
              <Text style={styles.dateText}>
                {selectedDate.toISOString().split('T')[0]}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={25}
                color={theme.iconColor}
              />
            </Pressable>
            <DatePicker
              modal
              open={openDate}
              date={selectedDate}
              mode="date"
              onConfirm={date => {
                setOpenDate(false);
                setSelectedDate(date);
                handleChange('date', date.toISOString().split('T')[0]);
              }}
              onCancel={() => setOpenDate(false)}
            />
          </View>
          <View>
            <Text style={styles.label}>{strings.TIME}</Text>
            <Pressable
              style={styles.dateView}
              onPress={() => setOpenTime(true)}>
              <Text style={styles.dateText}>
                {selectedTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Feather name="clock" size={25} color={theme.iconColor} />
            </Pressable>
            <DatePicker
              modal
              open={openTime}
              date={selectedTime}
              mode="time"
              onConfirm={selectedTime => {
                setOpenTime(false);
                setSelectedTime(selectedTime);
                handleChange('time', selectedTime.toLocaleTimeString());
              }}
              onCancel={() => setOpenTime(false)}
            />
          </View>
        </View>

        <Text style={styles.label}>{strings.COUNTRY}</Text>
        <Dropdown
          style={styles.dropdown}
          data={countries}
          labelField="label"
          valueField="label"
          placeholder={strings.SELECT_COUNTRY}
          value={selectedCountry?.label || null}
          onChange={handleCountryChange}
        />

        <Text style={styles.label}>{strings.STATE}</Text>
        <Dropdown
          style={styles.dropdown}
          data={selectedCountry ? states[selectedCountry.value] : []}
          labelField="label"
          valueField="label"
          placeholder={strings.SELECT_STATE}
          value={selectedState?.label || null}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        />

        <Text style={styles.label}>{strings.CITY}</Text>

        <Dropdown
          style={styles.dropdown}
          data={selectedState ? cities[selectedState.value] : []}
          labelField="label"
          valueField="label"
          placeholder={strings.SELECT_CITY}
          value={selectedCity?.label || null}
          onChange={handleCityChange}
          disabled={!selectedCity}
        />
        <Text style={styles.label}>{strings.IMAGES}</Text>
        <Pressable onPress={pickImages} style={styles.imagePicker}>
          <Text style={styles.uploadText}>{strings.UPLOAD_IMAGES}</Text>
        </Pressable>

        <ScrollView horizontal style={styles.imageScroll}>
          {form.images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.image} />
              <Pressable
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}>
                <Icon size={18} color={theme.iconColor} name="cross" />
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.label}>{strings.NUMBER_OF_ATTENDEES}</Text>
        <TextInput
          style={styles.input}
          value={form.attendees}
          onChangeText={text => handleChange('attendees', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>{strings.DESCRIPTION}</Text>
        <TextInput
          style={[styles.input, styles.input2]}
          value={form.description}
          onChangeText={text => handleChange('description', text)}
          multiline
        />
      </ScrollView>
      <Button title={strings.CREATE_EVENT} onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default CreateEvent;
