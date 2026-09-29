# API contract tests — 0.0.1-LAB

- API-001 GET /health → ONLINE
- API-002 GET /devices → Fake DVR
- API-003 GET /cameras → 4 cameras
- LAB-001 POST camera offline → camera OFFLINE + DVR DEGRADED
- LAB-002 POST camera online → camera ONLINE
- LAB-003 POST reset → all cameras ONLINE
- WS-001 connection → CONNECTED
- WS-002 camera state change → CAMERA_STATE_CHANGED

These LAB mutation endpoints must not exist in STABLE builds.
