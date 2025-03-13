import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import {SignUpStyles} from './SignUpScreen.style';
import {route} from '../../navigation/constants';
import {strings} from '../../utils/strings';
import {navigate} from '../../navigation/NavigationService';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import {useTheme} from '../../utils/Theme/useTheme';

const SignUpScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = SignUpStyles(theme);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = () => {
    navigate(route.LOGIN);
  };

  const handleSignUp = async () => {
    if (name === '') {
      setErrorMessage('Please enter name');
      return;
    } else if (email === '') {
      setErrorMessage('Please enter email');
      return;
    } else if (password === '') {
      setErrorMessage('Please enter password');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Password and confirm password should be same');
      return;
    } else {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        // Set the display name
        await updateProfile(userCredential.user, {displayName: name});

        navigate(route.HOME_SCREEN);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {strings.SIGN_UP}
          </Text>
          <Input label="Name" value={name} onChangeText={setName} />
          <Input
            label={strings.EMAIL}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Create password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Button
            style={styles.buttonStyle}
            title={strings.SIGN_UP}
            onPress={handleSignUp}
            mode="contained"
          />
          <Button mode="outlined" title={strings.LOGIN} onPress={handleLogin} />
        </Card.Content>
      </Card>
    </View>
  );
};

export default React.memo(SignUpScreen);
