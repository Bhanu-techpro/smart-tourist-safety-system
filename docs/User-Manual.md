# User Manual

This manual provides instructions for the two main user groups of the system: Tourists (using the mobile app) and Monitoring Staff (using the web dashboard).

## Part 1: For Tourists (Mobile App)

### 1.1. Getting Started
1. **Installation**: Download and install the "Smart Tourist Safety" app from the app store (or as provided).
2. **Login**: Launch the app and log in using the Digital Tourist ID and password provided to you upon registration.

### 1.2. Main Features

#### Dashboard Screen
- **Map View**: After logging in, you'll see a map displaying your current location.
- **Status**: Your Digital ID status (Active, Expired) is shown at the top.
- **Itinerary**: A summary of your planned itinerary may be displayed.

#### Emergency (Panic Button)
- **Location**: The large, red "PANIC" button is located in the center of the tab bar.
- **Activation**: In an emergency, tap and hold the button for 3 seconds. This is to prevent accidental activation.
- **What Happens**:
    - An immediate alert is sent to the monitoring center with your exact location.
    - The monitoring team will be notified and will initiate the emergency response protocol.
    - Your emergency contacts may also be notified.
- **Use this feature for genuine emergencies only.**

#### Profile Screen
- **View Details**: See your registration details, including your name, Digital ID validity, and itinerary.
- **Emergency Contacts**: Review your listed emergency contacts.
- **Language**: Change the app's language between English and Hindi.
- **Logout**: Log out of the application.

#### Notifications
- **Geofence Alerts**: You will receive push notifications if you enter a restricted area or leave a designated safe zone.
- **System Alerts**: You may receive other important safety alerts from the monitoring center.

### 1.3. Best Practices
- **Keep Location Services On**: The app needs access to your location to provide safety features.
- **Ensure Internet Connectivity**: The app requires an internet connection to communicate with the backend. Some features may work in offline mode, but real-time tracking and panic alerts will not.
- **Battery**: Keep your phone charged. Continuous GPS usage can consume battery faster than usual.

## Part 2: For Monitoring Staff (Web Dashboard)

### 2.1. Access and Login
1. **Access**: Open your web browser and navigate to the dashboard URL provided by your administrator (e.g., `http://localhost:3000`).
2. **Login**: Log in with your assigned credentials. Your role (e.g., Admin, Operator) will determine your access level.

### 2.2. Dashboard Overview
The main dashboard provides a real-time overview of all tourist activity.
- **Tourist Map**: A live map showing the current location of all active tourists. Tourists may be color-coded based on their status (e.g., green for normal, red for alert).
- **Alerts Panel**: A real-time feed of incoming alerts. New alerts will appear at the top.
- **Key Metrics**: Widgets showing statistics like the number of active tourists, open alerts, and recent incidents.

### 2.3. Managing Alerts
- **New Alerts**: New alerts will trigger a visual and/or audible notification.
- **Acknowledge**: Click on a new alert in the Alerts Panel to acknowledge it. This indicates that you are handling it.
- **View Details**: Clicking an alert will center the map on the tourist's location and may open a detail view with more information (tourist name, time of alert, alert type).

### 2.4. Tourist Management
- **Search**: Use the search bar to find a specific tourist by name or ID.
- **View Profile**: From the `Tourist Management` page or by clicking on a tourist on the map, you can view their full profile, including their itinerary, emergency contacts, and recent activity.
- **List View**: The `Tourist Management` page displays a list of all registered tourists with sorting and filtering options.

### 2.5. Incident Response
- **Create an Incident Report**: When an alert is confirmed as a real incident, you can create an incident report. This can be done from the alert detail view.
- **Fill Report**: Complete the incident report form with all relevant details: nature of the incident, actions taken, personnel involved, and current status.
- **Track Incidents**: The `Reports` page lists all open and closed incidents. You can update a report as the situation evolves and close it once resolved.

### 2.6. Reports and Analytics
- The `Reports` page provides access to historical data and analytics.
- **Generate Reports**: Create reports on tourist activity, alert patterns, and incident response times.
- **Data Visualization**: View charts and graphs that visualize trends, helping to identify potential hotspots or recurring issues.
