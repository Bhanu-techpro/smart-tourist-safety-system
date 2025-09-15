-- PostgreSQL Schema for Alerts

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    tourist_id INTEGER NOT NULL REFERENCES tourists(id) ON DELETE CASCADE,
    
    type VARCHAR(50) NOT NULL, -- PANIC, GEOFENCE_VIOLATION, ANOMALY_DETECTED
    location GEOMETRY(Point, 4326) NOT NULL,
    message TEXT,
    
    status VARCHAR(50) DEFAULT 'new', -- new, acknowledged, resolved
    
    acknowledged_by_user_id INTEGER, -- REFERENCES users(id)
    resolved_by_user_id INTEGER, -- REFERENCES users(id)
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX alerts_tourist_id_idx ON alerts(tourist_id);
CREATE INDEX alerts_status_idx ON alerts(status);

CREATE TRIGGER update_alerts_updated_at
BEFORE UPDATE ON alerts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
