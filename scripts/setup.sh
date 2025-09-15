#!/bin/bash

echo "--- Installing Blockchain Dependencies ---"
cd blockchain && npm install && cd ..

echo "--- Installing Backend Dependencies ---"
cd backend && npm install && cd ..

echo "--- Installing Mobile App Dependencies ---"
cd mobile-app && npm install && cd ..

echo "--- Installing Dashboard Dependencies ---"
cd dashboard && npm install && cd ..

echo "--- All dependencies installed successfully! ---"
