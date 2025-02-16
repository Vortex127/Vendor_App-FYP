import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (email && password) {
      Keyboard.dismiss();
      await login(email, password);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </Animated.View>

          <View style={styles.form}>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              leftIcon={<Icon name="email" type="material" size={24} color="#B2BEC3" />}
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              disabled={loading}
            />

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              leftIcon={<Icon name="lock" type="material" size={24} color="#B2BEC3" />}
              rightIcon={
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  type="material"
                  size={24}
                  color="#B2BEC3"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputField}
              disabled={loading}
            />

            {error && (
              <Animated.Text style={[styles.errorText, { opacity: fadeAnim }]}>{error}</Animated.Text>
            )}

            <Button
              title="Forgot Password?"
              type="clear"
              titleStyle={styles.forgotPassword}
              containerStyle={styles.forgotPasswordContainer}
              disabled={loading}
            />

            <Button
              title={loading ? '' : "Login"}
              buttonStyle={styles.loginButton}
              containerStyle={styles.buttonContainer}
              onPress={handleLogin}
              disabled={loading}
              icon={loading ? <ActivityIndicator color="#fff" /> : null}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Button
              title="Sign Up"
              type="clear"
              titleStyle={styles.signUpButton}
              onPress={() => navigation.navigate('Signup')}
              disabled={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#636E72',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DFE6E9',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 15,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#636E72',
    fontSize: 16,
  },
  signUpButton: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;