import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Wallet() {
  const [balance, setBalance] = useState(2500); // Example starting balance
  const [amount, setAmount] = useState('');

  const handleFundWallet = () => {
    const fundAmount = parseFloat(amount);
    if (!isNaN(fundAmount) && fundAmount > 0) {
      setBalance(prev => prev + fundAmount);
      setAmount('');
      alert(`Wallet funded with ₦${fundAmount}`);
    } else {
      alert('Enter a valid amount');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.balance}>Current Balance: ₦{balance.toFixed(2)}</Text>

      <TextInput
        placeholder="Enter amount to fund"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleFundWallet}>
        <Text style={styles.buttonText}>Fund Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  balance: { fontSize: 20, marginBottom: 20, color: 'green' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, width: '80%', marginBottom: 15
  },
  button: {
    backgroundColor: '#0a7b0a', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
