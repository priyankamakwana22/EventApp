import React, {useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import {route} from '../../navigation/constants';
import {strings} from '../../utils/strings';
import {forgotPasswordStyles} from './ForgotPassword.style';
import {replace} from '../../navigation/NavigationService';
import auth from '@react-native-firebase/auth';
import {useTheme} from '../../utils/Theme/useTheme';

const ForgotPassword = () => {
  const {theme} = useTheme();
  const styles = forgotPasswordStyles(theme);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetLink = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);

      Alert.alert('Successfully sent the password reset link to the', email, [
        {text: 'OK', onPress: () => replace(route.LOGIN)},
      ]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const backToLogin = () => {
    replace(route.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {strings.FORGOT_PASSWORD}
          </Text>

          <Text style={styles.subTitle}>{strings.ENTER_YOUR_EMAIL}</Text>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Button
            style={styles.buttonStyle}
            title={strings.REQUEST_RESET_LINK}
            onPress={handleResetLink}
            mode="contained"
          />

          <Pressable onPress={backToLogin}>
            <Text style={styles.backToLoginText}>{strings.BACK_TO_LOGIN}</Text>
          </Pressable>
        </Card.Content>
      </Card>
    </View>
  );
};

export default React.memo(ForgotPassword);
