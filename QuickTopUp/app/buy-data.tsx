import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';

// Define allowed network names
type NetworkName = 'MTN' | 'Airtel' | 'Glo' | '9mobile';

const networks: { name: NetworkName; logo: any }[] = [
  { name: 'MTN', logo: require('../assets/images/mtn.jpeg') },
  { name: 'Airtel', logo: require('../assets/images/airtel.png') },
  { name: 'Glo', logo: require('../assets/images/glo.jpeg') },
  { name: '9mobile', logo: require('../assets/images/9mobile.png') },
];

const bundles: Record<NetworkName, string[]> = {
  MTN: ['500MB - ₦200', '1GB - ₦300', '2GB - ₦500', '5GB - ₦1200'],
  Airtel: ['500MB - ₦250', '1.5GB - ₦500', '3GB - ₦900', '5GB - ₦1400'],
  Glo: ['1GB - ₦200', '2GB - ₦400', '5GB - ₦1000', '10GB - ₦1800'],
  '9mobile': ['500MB - ₦300', '1GB - ₦500', '2GB - ₦800', '5GB - ₦1500'],
};

export default function BuyData() {
  const [walletBalance, setWalletBalance] = useState(3000);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | ''>('');
  const [selectedBundle, setSelectedBundle] = useState('');

  const handlePurchase = () => {
    if (!/^\d{11}$/.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 11-digit phone number.');
      return;
    }

    if (!selectedNetwork || !selectedBundle) {
      Alert.alert('Incomplete Selection', 'Please select both a network and bundle.');
      return;
    }

    const priceMatch = selectedBundle.match(/₦(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;

    if (walletBalance < price) {
      Alert.alert('Insufficient Balance', `You need ₦${price}, but have ₦${walletBalance}`);
      return;
    }

    setWalletBalance(prev => prev - price);

    Alert.alert(
      'Success',
      `${selectedBundle} purchased for ${phoneNumber} on ${selectedNetwork}. New Balance: ₦${walletBalance - price}`
    );

    setPhoneNumber('');
    setSelectedNetwork('');
    setSelectedBundle('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buy Data</Text>
      <Text style={styles.balance}>Wallet Balance: ₦{walletBalance}</Text>

      <TextInput
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <Text style={styles.sectionTitle}>Select Network</Text>
      <View style={styles.networkGrid}>
        {networks.map((net, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.networkCard,
              selectedNetwork === net.name && styles.selectedNetwork,
            ]}
            onPress={() => {
              setSelectedNetwork(net.name);
              setSelectedBundle('');
            }}
          >
            <Image source={net.logo} style={styles.networkLogo} />
            <Text style={styles.networkText}>{net.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedNetwork ? (
        <>
          <Text style={styles.sectionTitle}>Select Bundle for {selectedNetwork}</Text>
          <View style={styles.bundleGrid}>
            {bundles[selectedNetwork].map((bundle: string, idx: number) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.bundleCard,
                  selectedBundle === bundle && styles.selectedBundle,
                ]}
                onPress={() => setSelectedBundle(bundle)}
              >
                <Text style={styles.bundleText}>{bundle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}

      <TouchableOpacity style={styles.payButton} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Pay with Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  balance: { fontSize: 16, textAlign: 'center', marginBottom: 15, color: 'green' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },

  networkGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  networkCard: { width: '47%', backgroundColor: '#f5f5f5', borderRadius: 8, alignItems: 'center', padding: 10, marginBottom: 10 },
  selectedNetwork: { borderColor: '#0a7b0a', borderWidth: 2 },
  networkLogo: { width: 40, height: 40, marginBottom: 5 },
  networkText: { fontSize: 14, fontWeight: '600' },

  bundleGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  bundleCard: { width: '47%', backgroundColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  selectedBundle: { backgroundColor: '#0a7b0a' },
  bundleText: { fontSize: 14, color: '#000' },

  payButton: { backgroundColor: '#0a7b0a', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
});
