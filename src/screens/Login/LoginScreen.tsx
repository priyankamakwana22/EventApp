import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {loginStyles} from './LoginScreen.style';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import {route} from '../../navigation/constants';
import {strings} from '../../utils/strings';
import {replace} from '../../navigation/NavigationService';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {useTheme} from '../../utils/Theme/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../../utils/storageKeys';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {theme} = useTheme();
  const styles = loginStyles(theme);

  const handleLogin = async () => {
    if (email === '') {
      setErrorMessage('Please enter email');
      return;
    }
    if (password === '') {
      setErrorMessage('Please enter password');
      return;
    }
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      replace(route.HOME_SCREEN);
      AsyncStorage.setItem(StorageKeys.IS_LOGGED_IN, 'true');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = () => {
    replace(route.SIGN_UP_SCREEN);
  };

  const forgotPassword = () => {
    replace(route.FORGOT_PASSWORD);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {strings.LOGIN}
          </Text>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Pressable onPress={forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              {strings.FORGOT_PASSWORD_Q}
            </Text>
          </Pressable>

          <Button
            style={styles.buttonStyle}
            title="Login"
            onPress={handleLogin}
            mode="contained"
          />

          <Button
            title={strings.SIGN_UP}
            onPress={handleSignUp}
            mode="outlined"
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default React.memo(LoginScreen);
