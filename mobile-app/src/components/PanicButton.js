import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Vibration,
} from 'react-native';
import api from '../services/api';
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';

export default function PanicButton() {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation();

  const handlePress = () => {
    Alert.alert(t('confirmPanicTitle'), t('confirmPanicMessage'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('confirm'), onPress: triggerPanic, style: 'destructive' },
    ]);
  };

  const triggerPanic = () => {
    setIsPressed(true);
    Vibration.vibrate([500, 500, 500]); // Vibrate pattern

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await api.post('/emergency/panic', {
            location: { latitude, longitude },
          });
          Alert.alert(t('alertSentTitle'), t('alertSentMessage'));
        } catch (error) {
          console.error("Panic API call failed:", error);
          Alert.alert(t('error'), t('alertFailedMessage'));
        } finally {
          setIsPressed(false);
        }
      },
      (error) => {
        console.error(error);
        Alert.alert(t('error'), t('locationError'));
        setIsPressed(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPress={handlePress}
      disabled={isPressed}
    >
      <Text style={styles.text}>{isPressed ? t('sending') : t('panic')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonPressed: {
    backgroundColor: '#c9302c',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
