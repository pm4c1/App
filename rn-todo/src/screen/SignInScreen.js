import { Image, StyleSheet, View, Keyboard, Alert } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import { useState, useRef, useEffect } from 'react';
import Button from '../components/Buttons';
import { signIn } from '../api/auth';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  /*
  useEffect(() => {
    console.log('always: ', email, password);
  });

  useEffect(() => {
    console.log('first rendering: ', email, password);
  }, []);

  useEffect(() => {
    console.log('only email: ', email, password);
  }, [email]);
*/
  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        Keyboard.dismiss();
        const data = await signIn(email, password);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('로그인 실패', error, [
          { text: '확인', onPress: () => setIsLoading(false) },
        ]);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/main.png')} style={styles.image} />

      <Input
        title={'이메일'}
        placeholder={'test@email.com'}
        KeyboardTypes={KeyboardTypes.EMAIL}
        ReturnKeyTypes={ReturnKeyTypes.NEXT}
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        iconName={IconNames.EMAIL}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <Input
        ref={passwordRef}
        title={'비밀번호'}
        ReturnKeyTypes={ReturnKeyTypes.DONE}
        SecureTextEntry
        value={password}
        onChangeText={(password) => setEmail(password.trim())}
        iconName={IconNames.PASSWORD}
        onSubmitEditing={onSubmit}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="로그인"
          onPress={onSubmit}
          disabled={disabled}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  image: {
    width: 200,
    height: 200,
    padding: 100,
    margin: 80,
    marginTop: 700,
  },
});

export default SignInScreen;
