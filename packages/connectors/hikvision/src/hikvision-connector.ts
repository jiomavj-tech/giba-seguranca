import type {
  DeviceConnector, DeviceConnection, DiscoveredDevice, DeviceHealth, DeviceIdentity
} from "@giba/core";
import type { Capability } from "@giba/shared";

/**
 * Hikvision connector skeleton for 0.0.1-LAB.
 * No capability is claimed from documentation alone as physically verified.
 */
export class HikvisionConnector implements DeviceConnector {
  readonly id = "hikvision";

  async discover(): Promise<DiscoveredDevice[]> {
    // Network discovery comes in a separate service. No aggressive port scanning.
    return [];
  }

  async identify(_connection: DeviceConnection): Promise<DeviceIdentity> {
    throw new Error("HIKVISION_IDENTIFY_REQUIRES_LAB_CONNECTION");
  }

  async getCapabilities(_connection: DeviceConnection): Promise<Capability[]> {
    return [];
  }

  async getHealth(_connection: DeviceConnection): Promise<DeviceHealth> {
    return { status:"UNKNOWN", checkedAt:new Date().toISOString(), reason:"NOT_PROBED" };
  }
}
