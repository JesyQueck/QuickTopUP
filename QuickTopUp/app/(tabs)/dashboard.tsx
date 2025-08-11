import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

type Service = {
  name: string;
  route: '/buy-airtime' | '/buy-data' | '/wallet' | '/(tabs)/history';
};

export default function Dashboard() {
  const router = useRouter();

  const [userName] = useState('John Doe');
  const [walletBalance] = useState(2500);

  const services: Service[] = [
    { name: 'Buy Airtime', route: '/buy-airtime' },
    { name: 'Buy Data', route: '/buy-data' },
    { name: 'Fund Wallet', route: '/wallet' },
    { name: 'Transaction History', route: '/(tabs)/history' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back, {userName} 👋</Text>

      <View style={styles.walletCard}>
        <Text style={styles.walletText}>Wallet Balance</Text>
        <Text style={styles.walletAmount}>₦{walletBalance.toFixed(2)}</Text>
        <TouchableOpacity style={styles.fundButton} onPress={() => router.push('/wallet')}>
          <Text style={styles.fundButtonText}>Fund Wallet</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Quick Services</Text>

      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceCard}
            onPress={() => router.push(service.route)}
          >
            <Text style={styles.serviceText}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  walletCard: {
    backgroundColor: '#009a66',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  fundButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  fundButtonText: {
    color: '#009a66',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#fff',
    width: '47%',
    paddingVertical: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
