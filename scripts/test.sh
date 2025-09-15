#!/bin/bash

echo "--- Running Blockchain Tests ---"
cd blockchain && npx hardhat test && cd ..

echo "--- Running Backend Tests (if any) ---"
# cd backend && npm test && cd ..

echo "--- Running Mobile App Tests (if any) ---"
# cd mobile-app && npm test && cd ..

echo "--- Running Dashboard Tests (if any)---"
# cd dashboard && npm test && cd ..

echo "--- Testing complete ---"
