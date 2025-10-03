import React, { useState } from 'react';
import { Platform } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { theme } from '../assets/theme';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const auth = getAuth();

  const handleAuth = async () => {
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  const { useRouter } = require('expo-router');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={isSignUp ? 'Create Account' : 'Sign In'}
        onPress={handleAuth}
        color={theme.colors.accent}
      />
      <Text
        style={styles.switch}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Text>
      <Text
        style={[styles.switch, { color: theme.colors.primary, marginTop: 32 }]}
        onPress={() => router.push('/Dashboard')}
      >
        Skip for anonymous use
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accent,
    marginBottom: 16,
    fontSize: 18,
    padding: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  switch: {
    color: theme.colors.text,
    marginTop: 24,
    textDecorationLine: 'underline',
  },
});
