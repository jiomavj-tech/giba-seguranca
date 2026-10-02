# Hikvision connector — 0.0.1-LAB

Status: implementation started, physical validation pending.

## Integration policy

The connector is split from protocol adapters.

- HikvisionConnector: Giba contract
- IsapiAdapter: ISAPI communication
- later: OnvifAdapter
- later: RtspAdapter

Capabilities are recorded separately from protocol availability.

## Initial LAB sequence

1. Reachability
2. Authentication
3. Device identity
4. Firmware
5. Channels
6. Main stream
7. Substream
8. Snapshot
9. Disconnect/reconnect
10. 24h stability

No capability becomes LAB_VERIFIED merely because it appears in documentation.

## First targets

- iDS-7204HQHI-M1/S
- iDS-7208HQHI-M1/S
- iDS-7204HQHI-M1/XT
