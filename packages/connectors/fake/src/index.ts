import type {
  DeviceConnector, DeviceConnection, DiscoveredDevice, DeviceIdentity, DeviceHealth
} from "@giba/core";
import type { Capability } from "@giba/shared";

export class FakeSecurityConnector implements DeviceConnector {
  readonly id = "fake";

  async discover(): Promise<DiscoveredDevice[]> {
    return [{
      candidateId: "FAKE-DVR-001",
      manufacturerHint: "Giba Lab",
      modelHint: "Fake DVR 4CH",
      ip: "127.0.0.1",
      discoveryMethod: "SIMULATOR",
      confidence: "HIGH"
    }];
  }

  async identify(_connection: DeviceConnection): Promise<DeviceIdentity> {
    return {
      manufacturer: "Giba Lab",
      model: "Fake DVR 4CH",
      serial: "FAKE0001",
      firmware: "0.0.1-LAB"
    };
  }

  async getCapabilities(_connection: DeviceConnection): Promise<Capability[]> {
    return ["LIVE_VIEW", "MAIN_STREAM", "SUB_STREAM", "SNAPSHOT"];
  }

  async getHealth(_connection: DeviceConnection): Promise<DeviceHealth> {
    return { status: "ONLINE", checkedAt: new Date().toISOString() };
  }
}
