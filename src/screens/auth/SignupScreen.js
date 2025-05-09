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
  Dimensions,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnic_number: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading, error } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


 const handleSignup = async () => {
   setSignupError(null);

   try {
     Keyboard.dismiss();

     if (
       !formData.name ||
       !formData.cnic_number ||
       !formData.email ||
       !formData.password
     ) {
       const errorMessage = "Please fill in all fields";
       alert(errorMessage);
       setSignupError(errorMessage);
       return;
     }

     if (formData.password.length < 6) {
       const errorMessage = "Password must be at least 6 characters long";
       alert(errorMessage);
       setSignupError(errorMessage);
       return;
     }

     const userData = {
       name: formData.name,
       email: formData.email,
       password: formData.password,
       cnic_number: formData.cnic_number,
     };

     console.log("Sending signup data:", userData);

     const response = await axios.post(
       "http://192.168.18.8:5000/api/signup",
       userData,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     console.log("Axios response:", response.data);

     if (response.status !== 201 && response.status !== 200) {
       throw new Error(response.data.message || "Signup failed");
     }

     alert("Signup successful! Welcome, " + response.data.user.name);
     navigation.navigate("Login");
   } catch (error) {
     console.error("Signup API error:", error);
     alert(
       error.response?.data?.message ||
         error.message ||
         "Signup failed. Please try again later."
     );
     setSignupError(
       error.response?.data?.message || error.message || "Signup failed"
     );
   }
 };


  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#ff4500", "#cc3700"]} style={styles.gradient}>
       

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.content, { zIndex: 1 }]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.innerContent}>
                <Animated.View
                  style={[styles.formContainer, { opacity: fadeAnim }]}
                >
                  <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                  </View>

                  <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                      <Icon
                        name="person"
                        type="material"
                        size={24}
                        color="rgba(255, 255, 255, 0.8)"
                        style={styles.inputIcon}
                      />
                      <Input
                        placeholder="First Name"
                        value={formData.name}
                        onChangeText={(value) => updateFormData("name", value)}
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputField}
                        inputStyle={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        disabled={loading}
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <Icon
                        name="email"
                        type="material"
                        size={24}
                        color="rgba(255, 255, 255, 0.8)"
                        style={styles.inputIcon}
                      />
                      <Input
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(value) => updateFormData("email", value)}
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputField}
                        inputStyle={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        disabled={loading}
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <Icon
                        name="lock"
                        type="material"
                        size={24}
                        color="rgba(255, 255, 255, 0.8)"
                        style={styles.inputIcon}
                      />
                      <Input
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(value) =>
                          updateFormData("password", value)
                        }
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputField}
                        inputStyle={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        secureTextEntry={!showPassword}
                        disabled={loading}
                        rightIcon={
                          <Icon
                            name={
                              showPassword ? "visibility" : "visibility-off"
                            }
                            type="material"
                            size={24}
                            color="rgba(255, 255, 255, 0.8)"
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        }
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <Icon
                        name="credit-card"
                        type="material"
                        size={24}
                        color="rgba(255, 255, 255, 0.8)"
                        style={styles.inputIcon}
                      />
                      <Input
                        placeholder="CNIC Number"
                        value={formData.cnic_number}
                        onChangeText={(value) =>
                          updateFormData("cnic_number", value)
                        }
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputField}
                        inputStyle={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        disabled={loading}
                      />
                    </View>

                    {error && (
                      <View style={styles.errorContainer}>
                        <Icon
                          name="error"
                          type="material"
                          size={20}
                          color="#FF5252"
                        />
                        <Text style={styles.errorText}>{error}</Text>
                      </View>
                    )}

                    <Button
                      title={loading ? "" : "Sign Up"}
                      buttonStyle={styles.signupButton}
                      containerStyle={styles.buttonContainer}
                      onPress={handleSignup}
                      disabled={loading}
                      icon={loading ? <ActivityIndicator color="#fff" /> : null}
                    />
                  </View>

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      Already have an account?{" "}
                    </Text>
                    <Button
                      title="Login"
                      type="clear"
                      titleStyle={styles.loginButton}
                      onPress={() => navigation.navigate("Login")}
                      disabled={loading}
                    />
                  </View>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContent: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "transparent",
    borderRadius: 30,
    padding: 20,
    backdropFilter: "blur(10px)",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.87)",
    height: 56,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 0,
    height: 56,
  },
  inputField: {
    borderBottomWidth: 0,
    paddingVertical: 0,
    height: 56,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 82, 82, 0.1)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#FF5252",
    fontSize: 14,
    marginLeft: 8,
  },
  signupButton: {
    backgroundColor: "#ff4500",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  loginButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  doodleContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  doodleBase: {
    position: "absolute",
  },
});

export default SignupScreen;
