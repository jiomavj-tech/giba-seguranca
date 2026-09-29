export type Capability =
  | "LIVE_VIEW" | "PLAYBACK" | "SNAPSHOT" | "MAIN_STREAM" | "SUB_STREAM"
  | "PTZ" | "MOTION_DETECTION" | "PERSON_DETECTION" | "VEHICLE_DETECTION"
  | "ZONE_STATUS" | "ZONE_EVENTS" | "ARM" | "DISARM" | "PGM_CONTROL"
  | "FENCE_STATUS" | "GATE_TRIGGER" | "GATE_STATE" | "STORAGE_STATUS";

export type CapabilityConfidence =
  | "DOCUMENTED" | "DETECTED" | "LAB_VERIFIED" | "FIELD_VERIFIED";

export interface DeviceCapability {
  deviceId: string;
  capability: Capability;
  available: boolean;
  source: "DOCUMENTATION" | "PROBE" | "LAB_TEST" | "FIELD_TEST";
  confidence: CapabilityConfidence;
  limitation?: string;
  testedAt?: string;
}
