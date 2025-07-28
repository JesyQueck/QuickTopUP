import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function PayElectricity() {
  const [disco, setDisco] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!disco || !meterNumber || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!/^\d{6,}$/.test(meterNumber)) {
      Alert.alert('Error', 'Enter a valid meter number (minimum 6 digits)');
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Enter a valid amount greater than zero');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `Paid ₦${amount} to ${disco} for meter ${meterNumber}`);
      setDisco('');
      setMeterNumber('');
      setAmount('');
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pay Electricity Bill</Text>

      <TextInput
        placeholder="Disco (e.g. IKEDC)"
        value={disco}
        onChangeText={setDisco}
        style={styles.input}
      />
      <TextInput
        placeholder="Meter Number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Amount (₦)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#0a7b0a', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#6c6c6c' },
  buttonText: { color: '#fff', fontSize: 16 },
});
