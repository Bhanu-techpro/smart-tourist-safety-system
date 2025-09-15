import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PanicButton from '../components/PanicButton';
import { useTranslation } from 'react-i18next';

export default function EmergencyScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('emergencyTitle')}</Text>
      <Text style={styles.subtitle}>{t('emergencySubtitle')}</Text>
      <PanicButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
});
