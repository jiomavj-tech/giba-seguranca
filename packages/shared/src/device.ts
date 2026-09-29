export type DeviceStatus = "ONLINE" | "OFFLINE" | "DEGRADED" | "UNKNOWN";

export type DeviceType =
  | "DVR"
  | "NVR"
  | "CAMERA"
  | "ALARM_PANEL"
  | "FENCE"
  | "GATE"
  | "ACCESS_CONTROL"
  | "INTERCOM"
  | "RELAY"
  | "COMMUNICATION_MODULE";

export interface Device {
  id: string;
  locationId: string;
  name: string;
  type: DeviceType;
  manufacturer: string;
  model?: string;
  hardwareRevision?: string;
  firmware?: string;
  serial?: string;
  connectorId: string;
  status: DeviceStatus;
  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
}
