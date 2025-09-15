# Setup Guide

This guide provides detailed instructions for setting up and running the Smart Tourist Safety System on a local machine for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.x or later.
- **npm**: Should be included with Node.js.
- **Docker**: The latest version of Docker Desktop.
- **Docker Compose**: Should be included with Docker Desktop.
- **Git**: For cloning the repository.
- **Hardhat**: A development environment for Ethereum software. Install it globally or use `npx`.
- **A text editor**: Such as VS Code.

## Step 1: Get the Code

Clone the project repository from GitHub:
```bash
git clone <your-repository-url>
cd smart-tourist-safety-system
```

## Step 2: Configure Environment Variables

The system requires several environment variables to run correctly. You'll find `.env.example` files in the `backend` and `dashboard` directories. Create a `.env` file in each of these directories and fill in the required values.

### Backend (`backend/.env`)
```env
# Server Configuration
PORT=5000

# MongoDB Connection
DATABASE_URL=mongodb://mongo:27017/smart_tourist_db

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d

# Blockchain Configuration
BLOCKCHAIN_RPC_URL=https://rpc-mumbai.maticvigil.com
CONTRACT_ADDRESS=0x... # Add after deploying the contract
ADMIN_PRIVATE_KEY=your_blockchain_wallet_private_key

# Email for Notifications (optional)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=password
```

### Dashboard (`dashboard/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WEBSOCKET_URL=http://localhost:5000
```

### Mobile App
Configuration for the mobile app is stored in `mobile-app/src/services/api.js`. Update the `API_BASE_URL` if your backend is not running on the default address.

## Step 3: Install Dependencies

A setup script is provided to install all necessary `npm` packages for each service (blockchain, backend, mobile-app, dashboard).

From the root directory, run:
```bash
sh scripts/setup.sh
```
This will execute `npm install` in each of the sub-directories.

## Step 4: Deploy the Smart Contract

The `DigitalTouristID` smart contract needs to be deployed to the Polygon Mumbai testnet.

1. **Navigate to the blockchain directory**:
   ```bash
   cd blockchain
   ```

2. **Ensure your wallet has test MATIC**:
   You can get some from the [Polygon Faucet](https://faucet.polygon.technology/).

3. **Deploy the contract**:
   ```bash
   npx hardhat run scripts/deploy.js --network mumbai
   ```

4. **Update `.env`**:
   After deployment, the script will print the contract's address to the console. Copy this address and paste it into the `CONTRACT_ADDRESS` field in the `backend/.env` file.

## Step 5: Run the System with Docker Compose

The easiest way to run the entire system (backend, dashboard, and database) is by using the provided Docker Compose configuration.

From the root directory of the project, run:
```bash
docker-compose up --build
```
- The `--build` flag tells Docker Compose to build the images from the Dockerfiles the first time you run the command.
- This will start three containers:
    - `backend`: The Node.js API server.
    - `dashboard`: The React web dashboard.
    - `mongo`: The MongoDB database.

## Step 6: Run the Mobile App

The mobile app must be run separately in an emulator or on a physical device.

1. **Navigate to the mobile-app directory**:
   ```bash
   cd mobile-app
   ```

2. **Start the Metro bundler**:
   ```bash
   npx react-native start
   ```

3. **Run on Android or iOS**:
   In a separate terminal, run one of the following commands:
   ```bash
   # For Android
   npx react-native run-android

   # For iOS (on macOS)
   npx react-native run-ios
   ```

## Step 7: Verify the Setup

- **Dashboard**: Open your web browser and navigate to `http://localhost:3000`. You should see the dashboard login page.
- **Backend**: You can test the API endpoints using a tool like Postman or by interacting with the dashboard/mobile app. The API will be available at `http://localhost:5000`.
- **Database**: You can connect to the MongoDB instance using a client like MongoDB Compass at `mongodb://localhost:27017`.

You have now successfully set up the Smart Tourist Safety System on your local machine.
