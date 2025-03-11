import React, {useState} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {CreateEventStyles} from './CreateEvent.style';
import {useTheme} from '../../utils/Theme/useTheme';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../component/Button/Button';
import {strings} from '../../utils/strings';
import Header from '../../component/Header/Header';
import {goBack} from '../../navigation/NavigationService';
import {cities, countries, states} from '../../utils/data';

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
  console.log('🚀 ~ form:', form);

  const {theme} = useTheme();
  const styles = CreateEventStyles(theme);

  const handleChange = (key: keyof FormState, value: any) => {
    setForm(prevForm => ({...prevForm, [key]: value}));
  };

  const handleCountryChange = (item: {value: string}) => {
    handleChange('country', item.value);
    handleChange('state', '');
    handleChange('city', '');
  };

  const handleStateChange = (item: {value: string}) => {
    handleChange('state', item.value);
    handleChange('city', '');
  };

  const handleCityChange = (item: {value: string}) => {
    handleChange('city', item.value);
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

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.country ||
      !form.state ||
      !form.city ||
      !form.attendees ||
      !form.description
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Event created successfully!');
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

        <Text style={styles.label}>{strings.DATE}</Text>
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            selectedDate && handleChange('date', selectedDate)
          }
        />

        <Text style={styles.label}>{strings.TIME}</Text>
        <DateTimePicker
          value={form.time}
          mode="time"
          onChange={(event, selectedTime) =>
            selectedTime && handleChange('time', selectedTime)
          }
        />

        <Text style={styles.label}>{strings.SELECT_COUNTRY}</Text>
        <Dropdown
          style={styles.dropdown}
          data={countries}
          labelField="label"
          valueField="value"
          placeholder="Select Country"
          value={form.country}
          onChange={handleCountryChange}
        />

        <Text style={styles.label}>{strings.SELECT_STATE}</Text>
        <Dropdown
          style={styles.dropdown}
          data={form.country ? states[form.country] : []}
          labelField="label"
          valueField="value"
          placeholder="Select State"
          value={form.state}
          onChange={handleStateChange}
          disabled={!form.country}
        />

        <Text style={styles.label}>{strings.SELECT_CITY}</Text>
        <Dropdown
          style={styles.dropdown}
          data={form.state ? cities[form.state] : []}
          labelField="label"
          valueField="value"
          placeholder="Select City"
          value={form.city}
          onChange={handleCityChange}
          disabled={!form.state}
        />

        <Text style={styles.label}>{strings.SELECT_IMAGES}</Text>
        <Pressable onPress={pickImages} style={styles.imagePicker}>
          <Text>{strings.UPLOAD_IMAGES}</Text>
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
