# Smart Tourist Safety Monitoring & Incident Response System

## 1. Overview

This project is a comprehensive system designed to enhance the safety and security of tourists. It leverages modern technologies including blockchain for digital identity, real-time location tracking, a mobile app with a panic button, and a web-based dashboard for monitoring and incident response.

### Key Features:
- **Digital Tourist ID on Blockchain**: Secure and verifiable tourist identity using a smart contract on the Polygon network.
- **Real-time Location Tracking**: Live monitoring of tourist locations via a mobile app.
- **Emergency Panic Button**: A one-tap feature in the mobile app to send distress signals.
- **Geofencing Alerts**: Automatic warnings when tourists enter or leave predefined zones.
- **AI-Powered Anomaly Detection**: Backend service to detect unusual patterns (e.g., sudden stops, deviations from itinerary).
- **Centralized Monitoring Dashboard**: A web application for authorities to view tourist locations, manage alerts, and respond to incidents.
- **Incident Reporting & Management**: Tools for creating, tracking, and resolving safety incidents.
- **Multilingual Support**: The mobile app supports English and Hindi.

### Technology Stack:
- **Blockchain**: Solidity, Hardhat, Ethers.js, Polygon Mumbai Testnet
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Mobile App**: React Native
- **Dashboard**: React.js, Material-UI, React-Leaflet
- **Database**: MongoDB (application data), PostgreSQL (optional relational data)
- **Deployment**: Docker, Docker Compose

## 2. Project Structure

The project is organized into several microservices and modules:

```
smart-tourist-safety-system/
├── blockchain/       # Smart contracts and blockchain scripts
├── backend/          # Express.js server, API, and business logic
├── mobile-app/       # React Native application for tourists
├── dashboard/        # React.js web dashboard for authorities
├── database/         # SQL schema and seed data
├── docs/             # Project documentation
├── docker/           # Dockerfiles and Docker Compose configuration
├── scripts/          # Setup, deployment, and test scripts
├── postman/          # Postman collection for API testing
└── README.md         # This file
```

## 3. Quick Start

### Prerequisites
- Node.js (v18+) & npm
- Docker & Docker Compose
- Hardhat
- React Native development environment
- A `.env` file in the `backend` and `dashboard` directories (use `.env.example` as a template).

### Setup & Deployment
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd smart-tourist-safety-system
   ```

2. **Run the setup script**:
   This will install all dependencies for each service.
   ```bash
   sh scripts/setup.sh
   ```

3. **Deploy the smart contract**:
   Navigate to the `blockchain` directory and deploy the contract.
   ```bash
   cd blockchain
   npx hardhat run scripts/deploy.js --network mumbai
   ```
   Update the `CONTRACT_ADDRESS` in the backend's `.env` file with the deployed contract address.

4. **Launch the system using Docker Compose**:
   From the root directory, run:
   ```bash
   docker-compose up --build
   ```

5. **Access the services**:
   - **Backend API**: `http://localhost:5000`
   - **Dashboard**: `http://localhost:3000`
   - **Mobile App**: Run on an emulator or physical device.

## 4. Detailed Documentation

For more detailed information, please refer to the `docs` directory:
- **[Setup-Guide.md](./docs/Setup-Guide.md)**: Step-by-step installation and configuration.
- **[API-Documentation.md](./docs/API-Documentation.md)**: Comprehensive guide to the backend API.
- **[Architecture.md](./docs/Architecture.md)**: In-depth explanation of the system architecture.
- **[User-Manual.md](./docs/User-Manual.md)**: Instructions for using the mobile app and dashboard.
