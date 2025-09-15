import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from '../components/MapView';
import { useTranslation } from 'react-i18next';

export default function DashboardScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('liveLocation')}</Text>
      <MapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
  },
});
