import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import api from './api';

class LocationService {
  watchId = null;

  async requestPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // For iOS, permission is requested when Geolocation methods are called.
    return true;
  }

  startTracking() {
    this.requestPermission().then((granted) => {
      if (granted) {
        this.watchId = Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.sendLocation({ latitude, longitude });
          },
          (error) => console.log(error),
          { enableHighAccuracy: true, distanceFilter: 20, interval: 30000 }
        );
      }
    });
  }

  stopTracking() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  async sendLocation(location) {
    try {
      await api.post('/tourist/location', location);
    } catch (error) {
      console.error('Failed to send location update:', error);
    }
  }
}

export default new LocationService();
