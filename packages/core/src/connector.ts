import type { Capability } from "@giba/shared";

export interface DeviceConnection {
  host?: string;
  port?: number;
  credentialRef?: string;
}

export interface DiscoveredDevice {
  candidateId: string;
  manufacturerHint?: string;
  modelHint?: string;
  ip?: string;
  mac?: string;
  discoveryMethod: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
}

export interface DeviceIdentity {
  manufacturer: string;
  model?: string;
  serial?: string;
  firmware?: string;
  hardwareRevision?: string;
}

export interface DeviceHealth {
  status: "ONLINE" | "OFFLINE" | "DEGRADED" | "UNKNOWN";
  checkedAt: string;
  reason?: string;
}

export interface DeviceConnector {
  readonly id: string;
  discover(): Promise<DiscoveredDevice[]>;
  identify(connection: DeviceConnection): Promise<DeviceIdentity>;
  getCapabilities(connection: DeviceConnection): Promise<Capability[]>;
  getHealth(connection: DeviceConnection): Promise<DeviceHealth>;
}
