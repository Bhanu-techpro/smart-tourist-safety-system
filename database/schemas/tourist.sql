-- PostgreSQL Schema for Tourists

CREATE TABLE tourists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    passport_number_encrypted VARCHAR(255) UNIQUE NOT NULL,
    
    -- Itinerary stored as JSONB
    itinerary JSONB,
    
    -- Emergency contacts stored as JSONB
    emergency_contacts JSONB,

    -- Blockchain related info
    digital_id_address VARCHAR(42) UNIQUE,
    digital_id_hash VARCHAR(66),
    digital_id_expiry_timestamp TIMESTAMPTZ,

    -- Location
    last_location GEOMETRY(Point, 4326), -- Using PostGIS for location
    
    role VARCHAR(50) DEFAULT 'tourist',
    status VARCHAR(50) DEFAULT 'pending', -- pending, active, inactive, alert

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on the location for faster spatial queries
CREATE INDEX tourists_last_location_idx ON tourists USING GIST (last_location);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tourists_updated_at
BEFORE UPDATE ON tourists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
