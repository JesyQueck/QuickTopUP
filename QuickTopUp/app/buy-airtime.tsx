import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export default function BuyAirtime() {
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePurchase = () => {
    console.log(`Purchasing ${amount} airtime for ${phoneNumber} on ${network}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buy Airtime</Text>

      <TextInput
        placeholder="Network (MTN, Airtel, Glo, 9mobile)"
        value={network}
        onChangeText={setNetwork}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Amount (₦)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Pay with Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',  // white background to prevent black screen
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: '#000',  // ensure input text is visible
  },
  button: {
    backgroundColor: '#0a7b0a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
