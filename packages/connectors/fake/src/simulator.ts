import type { Camera, DeviceStatus } from "@giba/shared";

export class FakeDvrSimulator {
  readonly deviceId = "DEV-FAKE-001";
  private dvrStatus: DeviceStatus = "ONLINE";
  private cameras: Camera[] = [1,2,3,4].map(channel => ({
    id: `CAM-FAKE-00${channel}`,
    deviceId: "DEV-FAKE-001",
    channel,
    name: `Camera ${String(channel).padStart(2, "0")}`,
    status: "ONLINE"
  }));

  getDeviceStatus(): DeviceStatus { return this.dvrStatus; }
  getCameras(): Camera[] { return this.cameras.map(camera => ({ ...camera })); }

  setCameraStatus(cameraId: string, status: DeviceStatus): void {
    const camera = this.cameras.find(item => item.id === cameraId);
    if (!camera) throw new Error(`Camera not found: ${cameraId}`);
    camera.status = status;
  }

  setDvrStatus(status: DeviceStatus): void {
    this.dvrStatus = status;
    if (status === "OFFLINE") this.cameras = this.cameras.map(camera => ({ ...camera, status: "OFFLINE" }));
  }

  getAggregateStatus(): DeviceStatus {
    if (this.dvrStatus === "OFFLINE") return "OFFLINE";
    return this.cameras.every(camera => camera.status === "ONLINE") ? "ONLINE" : "DEGRADED";
  }

  reset(): void {
    this.dvrStatus = "ONLINE";
    this.cameras = this.cameras.map(camera => ({ ...camera, status: "ONLINE" }));
  }
}
