-- Sample Data for Smart Tourist Safety System (PostgreSQL)

-- Note: Passwords should be hashed. This is a placeholder.
-- Locations are in WKT format for PostGIS: 'SRID=4326;POINT(longitude latitude)'

-- Insert a sample tourist
INSERT INTO tourists (
    name, email, password_hash, date_of_birth, nationality, passport_number_encrypted, 
    itinerary, emergency_contacts, status, last_location
) VALUES (
    'John Doe', 
    'john.doe@example.com', 
    '$2a$10$...', -- Hashed password for 'password123'
    '1990-05-15', 
    'USA', 
    'encrypted_passport_xyz',
    '{
        "startDate": "2025-10-01",
        "endDate": "2025-10-15",
        "destinations": ["Delhi", "Agra", "Jaipur"]
    }',
    '[{
        "name": "Jane Doe",
        "phone": "123-456-7890",
        "relationship": "Spouse"
    }]',
    'active',
    'SRID=4326;POINT(77.216721 28.644800)' -- Location in Delhi
);

-- Insert another sample tourist
INSERT INTO tourists (
    name, email, password_hash, date_of_birth, nationality, passport_number_encrypted, 
    itinerary, emergency_contacts, status, last_location
) VALUES (
    'Maria Garcia', 
    'maria.garcia@example.com', 
    '$2a$10$...', -- Hashed password for 'password123'
    '1992-08-22', 
    'Spain', 
    'encrypted_passport_abc',
    '{
        "startDate": "2025-11-05",
        "endDate": "2025-11-20",
        "destinations": ["Mumbai", "Goa"]
    }',
    '[{
        "name": "Carlos Garcia",
        "phone": "987-654-3210",
        "relationship": "Brother"
    }]',
    'active',
    'SRID=4326;POINT(72.877655 19.075983)' -- Location in Mumbai
);

-- Insert a sample alert (linked to John Doe)
INSERT INTO alerts (
    tourist_id, type, location, message, status
) VALUES (
    1, -- Assuming John Doe is ID 1
    'PANIC',
    'SRID=4326;POINT(77.216721 28.644800)',
    'Panic button activated by John Doe',
    'new'
);

-- Insert a sample incident report (linked to the alert above)
-- Assume a dashboard user with ID 1 exists
INSERT INTO incidents (
    alert_id, tourist_id, type, description, actions_taken, status, reported_by_user_id
) VALUES (
    1, -- Assuming the panic alert is ID 1
    1, -- John Doe
    'Security',
    'Tourist reported feeling unsafe in a crowded market.',
    '{"Contacted local police patrol", "Advised tourist to move to a safer location"}',
    'Open',
    1 -- Dashboard user ID
);
