-- PostgreSQL Schema for Incidents

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    alert_id INTEGER NOT NULL REFERENCES alerts(id),
    tourist_id INTEGER NOT NULL REFERENCES tourists(id),
    
    type VARCHAR(50) NOT NULL, -- Medical, Security, Lost, Other
    description TEXT NOT NULL,
    actions_taken TEXT[], -- Array of strings
    
    status VARCHAR(50) DEFAULT 'Open', -- Open, In-Progress, Closed
    
    reported_by_user_id INTEGER NOT NULL, -- REFERENCES users(id)
    resolution_details TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX incidents_tourist_id_idx ON incidents(tourist_id);
CREATE INDEX incidents_status_idx ON incidents(status);

CREATE TRIGGER update_incidents_updated_at
BEFORE UPDATE ON incidents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
