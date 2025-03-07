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

  const styles = CreateEventStyles();

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const pickImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map(asset => asset.uri);
        handleChange('images', [...form.images, ...newImages]); // Add new images
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
    <SafeAreaView style={styles.container}>
      <View>
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
          display="default"
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
                <Text style={styles.removeImageText}>❌</Text>
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

        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create Event</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateEvent;
