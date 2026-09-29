import type { DeviceStatus } from "./device.js";

export interface Camera {
  id: string;
  deviceId: string;
  channel: number;
  name: string;
  status: DeviceStatus;
}

export type StateConfidence = "CONFIRMED" | "INFERRED" | "STALE" | "UNKNOWN";

export interface CurrentState<T = unknown> {
  entityId: string;
  value: T;
  confidence: StateConfidence;
  source: "SENSOR" | "DEVICE" | "CONNECTOR" | "EVENT" | "COMMAND_INFERENCE" | "MANUAL";
  updatedAt: string;
}
