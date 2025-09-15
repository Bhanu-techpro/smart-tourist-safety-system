# API Documentation

This document provides details on the RESTful API endpoints for the Smart Tourist Safety System.

**Base URL**: `http://localhost:5000/api`

## 1. Authentication

### `POST /auth/login`
Authenticates a user (tourist or dashboard staff) and returns a JWT.

- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (Success 200)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d5f1f3f8a4a06b3c8f5e7a",
      "name": "John Doe",
      "role": "tourist"
    }
  }
  ```
- **Response (Error 401)**: Invalid credentials.

---

## 2. Tourist Management

### `POST /tourist/register`
Registers a new tourist. This is an admin-protected route. It also interacts with the blockchain to create the Digital ID.

- **Headers**: `Authorization: Bearer <admin-jwt-token>`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "password123",
    "dateOfBirth": "1995-08-15",
    "nationality": "Canadian",
    "passportNumber": "AB123456",
    "itinerary": {
      "startDate": "2025-12-01",
      "endDate": "2025-12-15",
      "destinations": ["City A", "City B"]
    },
    "emergencyContacts": [
      { "name": "John Smith", "phone": "111-222-3333", "relationship": "Spouse" }
    ]
  }
  ```
- **Response (Success 201)**:
  ```json
  {
    "message": "Tourist registered successfully",
    "tourist": { ... } // Tourist object
  }
  ```

### `GET /tourist/:id`
Retrieves the details of a specific tourist.

- **Headers**: `Authorization: Bearer <jwt-token>`
- **URL Parameters**: `id` (Tourist's MongoDB ID)
- **Response (Success 200)**:
  ```json
  {
    // Tourist object
  }
  ```

---

## 3. Emergency & Alerts

### `POST /emergency/panic`
Triggered by a tourist from the mobile app in an emergency.

- **Headers**: `Authorization: Bearer <tourist-jwt-token>`
- **Request Body**:
  ```json
  {
    "location": {
      "latitude": 12.9716,
      "longitude": 77.5946
    }
  }
  ```
- **Response (Success 200)**:
  ```json
  {
    "message": "Panic alert received. Help is on the way."
  }
  ```
- **Side Effect**: Emits a `new-alert` event via WebSocket to the dashboard.

### `POST /alerts/ai`
An internal or protected endpoint for an AI service to post anomaly alerts.

- **Request Body**:
  ```json
  {
    "touristId": "60d5f1f3f8a4a06b3c8f5e7a",
    "alertType": "ANOMALY_DETECTED",
    "message": "Unusual stationary period detected.",
    "location": { ... }
  }
  ```
- **Response (Success 201)**:
  ```json
  {
    "message": "AI alert created."
  }
  ```

---

## 4. Dashboard Data

### `GET /dashboard/tourists`
Gets a list of all active tourists for display on the dashboard map.

- **Headers**: `Authorization: Bearer <dashboard-user-jwt-token>`
- **Response (Success 200)**:
  ```json
  [
    {
      "id": "60d5f1f3f8a4a06b3c8f5e7a",
      "name": "Jane Doe",
      "lastLocation": {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "timestamp": "2025-09-15T10:00:00Z"
      },
      "status": "active"
    }
  ]
  ```

### `GET /dashboard/alerts`
Retrieves all alerts for the alerts panel.

- **Headers**: `Authorization: Bearer <dashboard-user-jwt-token>`
- **Query Parameters**: `status` (e.g., 'new', 'acknowledged'), `limit`, `page`.
- **Response (Success 200)**: An array of alert objects.

---

## 5. Incident Reporting

### `POST /incidents/report`
Creates a new incident report, often linked to an alert.

- **Headers**: `Authorization: Bearer <dashboard-user-jwt-token>`
- **Request Body**:
  ```json
  {
    "alertId": "60d5f3a0f8a4a06b3c8f5e7b",
    "touristId": "60d5f1f3f8a4a06b3c8f5e7a",
    "type": "Medical",
    "description": "Tourist reported chest pain.",
    "actionsTaken": ["Dispatched medical team."],
    "status": "Open"
  }
  ```
- **Response (Success 201)**: The created incident object.

### `GET /incidents`
Retrieves a list of all incident reports.

- **Headers**: `Authorization: Bearer <dashboard-user-jwt-token>`
- **Response (Success 200)**: An array of incident objects.

## 6. WebSocket Events

The backend uses Socket.IO to push real-time updates to the dashboard.

- **Connection URL**: `http://localhost:5000`
- **Events Emitted by Server**:
  - `new-alert`: Sent when a new emergency or AI alert is created.
    - **Payload**: The full alert object.
  - `tourist-location-update`: Sent periodically with updated tourist locations.
    - **Payload**: `{ touristId: "...", location: { lat, lng } }`
  - `incident-update`: Sent when an incident report is created or updated.
    - **Payload**: The full incident object.
