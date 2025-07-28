import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // TODO: Call your backend for registration here
    console.log('Registering', email, password);
    router.replace('/(tabs)/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Email or Phone" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Register" onPress={handleRegister} />

      <Link href="/login" asChild>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});
