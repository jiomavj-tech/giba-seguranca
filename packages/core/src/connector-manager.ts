import type { DeviceConnector } from "./connector.js";

export class ConnectorManager {
  private readonly connectors = new Map<string, DeviceConnector>();

  register(connector: DeviceConnector): void {
    if (this.connectors.has(connector.id)) {
      throw new Error(`Connector already registered: ${connector.id}`);
    }
    this.connectors.set(connector.id, connector);
  }

  get(id: string): DeviceConnector {
    const connector = this.connectors.get(id);
    if (!connector) throw new Error(`Connector not found: ${id}`);
    return connector;
  }

  list(): DeviceConnector[] {
    return [...this.connectors.values()];
  }
}
