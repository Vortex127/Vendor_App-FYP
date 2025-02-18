import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../services/authclient";

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    cnicNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading, error } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignup = async () => {
    try {
      Keyboard.dismiss();
      // Form validation
      if (
        !formData.fullName ||
        !formData.cnicNumber ||
        !formData.email ||
        !formData.password
      ) {
        alert("Please fill in all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      const result = await signup(
        formData.fullName,
        formData.cnicNumber,
        formData.email,
        formData.password
      );

      if (result.success) {
        Alert.alert("Success", "Check your email for the verification link");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup Failed", result.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </Animated.View>

            <Animated.View style={styles.form}>
              <Input
                placeholder="First Name"
                value={formData.fullName}
                onChangeText={(value) => updateFormData("fullName", value)}
                leftIcon={
                  <Icon
                    name="person"
                    type="material"
                    size={24}
                    color="#B2BEC3"
                  />
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputField}
                disabled={loading}
              />

              <Input
                placeholder="Cnic Number"
                value={formData.lastName}
                onChangeText={(value) => updateFormData("cnicNumber", value)}
                leftIcon={
                  <Icon
                    name="person"
                    type="material"
                    size={24}
                    color="#B2BEC3"
                  />
                }
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputField}
                disabled={loading}
              />

              <Input
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData("email", value)}
                leftIcon={
                  <Icon
                    name="email"
                    type="material"
                    size={24}
                    color="#B2BEC3"
                  />
                }
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputField}
                disabled={loading}
              />

              <Input
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => updateFormData("password", value)}
                leftIcon={
                  <Icon name="lock" type="material" size={24} color="#B2BEC3" />
                }
                rightIcon={
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
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

              <Input
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  updateFormData("confirmPassword", value)
                }
                leftIcon={
                  <Icon name="lock" type="material" size={24} color="#B2BEC3" />
                }
                rightIcon={
                  <Icon
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    type="material"
                    size={24}
                    color="#B2BEC3"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                secureTextEntry={!showConfirmPassword}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputField}
                disabled={loading}
              />

              {error && <Text style={styles.errorText}>{error}</Text>}

              <Button
                title={loading ? "" : "Sign Up"}
                buttonStyle={styles.signupButton}
                containerStyle={styles.buttonContainer}
                onPress={handleSignup}
                disabled={loading}
                icon={loading ? <ActivityIndicator color="#fff" /> : null}
              />
            </Animated.View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Button
                title="Login"
                type="clear"
                titleStyle={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
                disabled={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#636E72",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#DFE6E9",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: "#ff4500",
    borderRadius: 12,
    paddingVertical: 15,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#636E72",
    fontSize: 16,
  },
  loginButton: {
    color: "#ff4500",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignupScreen;
