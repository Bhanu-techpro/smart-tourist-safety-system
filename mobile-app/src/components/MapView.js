import React, { useState, useEffect, useCallback } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import api from '../services/api';

export default function TouristMapView() {
  const [location, setLocation] = useState(null);

  const startLocationUpdates = useCallback(() => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        sendLocationToServer({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
      }
    );
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'This app needs to access your location to provide safety features.',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }
      }
      startLocationUpdates();
    };

    requestLocationPermission();

    return () => {
      Geolocation.stopObserving();
    };
  }, [startLocationUpdates]);

  const sendLocationToServer = async (loc) => {
    try {
      await api.post('/tourist/location', loc);
    } catch (error) {
      console.error("Failed to send location to server:", error);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Fetching location...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
