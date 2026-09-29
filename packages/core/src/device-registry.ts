import type { Device } from "@giba/shared";

export class DeviceRegistry {
  private readonly devices = new Map<string, Device>();

  register(device: Device): Device {
    if (this.devices.has(device.id)) throw new Error(`Device already registered: ${device.id}`);
    this.devices.set(device.id, device);
    return device;
  }

  get(id: string): Device | undefined { return this.devices.get(id); }
  list(): Device[] { return [...this.devices.values()]; }

  updateStatus(id: string, status: Device["status"]): Device {
    const device = this.devices.get(id);
    if (!device) throw new Error(`Device not found: ${id}`);
    const updated = { ...device, status, lastSeen: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.devices.set(id, updated);
    return updated;
  }
}
