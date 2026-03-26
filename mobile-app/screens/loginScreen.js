import React, { useState } from 'react'; // React aur Hook import kiya
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Eye icon ke liye

const LoginScreen = ({ navigation }) => {
  // 1. Hooks (State Management)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <Text style={styles.logoText}>Nazdeek</Text>
        
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subText}>Log in to your account to continue</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestBtn}>
          <Text style={styles.guestBtnText}>Continue as Guest</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles Section
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 25, paddingTop: 50 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#006666', textAlign: 'center', fontStyle: 'italic', marginBottom: 40 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  subText: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingRight: 15 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#006666', textDecorationLine: 'underline' },
  loginBtn: { backgroundColor: '#006666', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  guestBtn: { borderWidth: 2, borderColor: '#006666', padding: 15, borderRadius: 8, alignItems: 'center' },
  guestBtnText: { color: '#006666', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 100 },
  footerText: { color: 'gray' },
  signUpText: { color: '#006666', fontWeight: 'bold' }
});

export default LoginScreen;