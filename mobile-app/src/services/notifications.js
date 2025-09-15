import PushNotification from 'react-native-push-notification';

class NotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("NOTIFICATION TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // Handle incoming push notification while app is in foreground
        // You can display a local notification here
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message,
          channelId: 'default-channel-id',
        });
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    this.createChannels();
  }

  createChannels() {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        channelDescription: "A default channel for notifications",
        soundName: "default",
        importance: 4, // Importance.HIGH
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }

  // Use this to show a local notification
  showLocalNotification(title, message) {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      vibrate: true,
      vibration: 300,
    });
  }
}

export default new NotificationService();
