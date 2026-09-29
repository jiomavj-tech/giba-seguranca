CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT,
  hardware_revision TEXT,
  firmware TEXT,
  serial TEXT,
  connector_id TEXT NOT NULL,
  status TEXT NOT NULL,
  last_seen TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cameras (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  channel INTEGER,
  name TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS device_capabilities (
  device_id TEXT NOT NULL,
  capability TEXT NOT NULL,
  available INTEGER NOT NULL,
  source TEXT NOT NULL,
  confidence TEXT NOT NULL,
  limitation TEXT,
  tested_at TEXT,
  PRIMARY KEY (device_id, capability)
);
