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

const CreateEvent = () => {
  const [form, setForm] = useState({
    name: '',
    date: new Date(),
    time: new Date(),
    location: '',
    images: [],
    attendees: '',
    description: '',
  });
  console.log('🚀 ~ CreateEvent ~ form:', form);
  const {theme} = useTheme();
  const styles = CreateEventStyles(theme);

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const pickImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map(asset => asset.uri);
        handleChange('images', [...form.images, ...newImages]);
      }
    });
  };

  const removeImage = index => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    handleChange('images', updatedImages);
  };

  const handleSubmit = () => {
    if (!form.name || !form.location || !form.attendees || !form.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Event created successfully!');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Header
        leftComponent={
          <Pressable style={{alignSelf: 'flex-start'}} onPress={() => goBack()}>
            <Ionicons size={18} color={theme.textColor} name="chevron-back" />
          </Pressable>
        }
        bodyComponent={
          <Text style={styles.header}>{strings.CREATE_EVENT}</Text>
        }
      />
      <ScrollView>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />

        <Text style={styles.label}>Date:</Text>
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) handleChange('date', selectedDate);
          }}
        />

        <Text style={styles.label}>Time:</Text>
        <DateTimePicker
          value={form.time}
          mode="time"
          // display="default"
          onChange={(event, selectedTime) => {
            if (selectedTime) handleChange('time', selectedTime);
          }}
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={form.location}
          onChangeText={text => handleChange('location', text)}
        />

        <Text style={styles.label}>Images:</Text>
        <Pressable onPress={pickImages} style={styles.imagePicker}>
          <Text>Select Images</Text>
        </Pressable>

        {/* Show multiple images */}
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

        <Text style={styles.label}>Number of Attendees:</Text>
        <TextInput
          style={styles.input}
          value={form.attendees}
          onChangeText={text => handleChange('attendees', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, {height: 80}]}
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
