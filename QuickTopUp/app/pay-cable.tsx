import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function PayCable() {
  const [provider, setProvider] = useState('');
  const [smartcardNumber, setSmartcardNumber] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!provider || !smartcardNumber || !plan) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!/^\d{6,}$/.test(smartcardNumber)) {
      Alert.alert('Error', 'Enter a valid Smartcard number (minimum 6 digits)');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `Paid for ${plan} on ${provider} with Smartcard ${smartcardNumber}`);
      setProvider('');
      setSmartcardNumber('');
      setPlan('');
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pay Cable Subscription</Text>

      <TextInput
        placeholder="Provider (DSTV, GOTV, Startimes)"
        value={provider}
        onChangeText={setProvider}
        style={styles.input}
      />

      <TextInput
        placeholder="Smartcard Number"
        value={smartcardNumber}
        onChangeText={setSmartcardNumber}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Subscription Plan"
        value={plan}
        onChangeText={setPlan}
        style={styles.input}
      />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handlePayment} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Pay Now</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#0a7b0a', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#6c6c6c' },
  buttonText: { color: '#fff', fontSize: 16 },
});
