import { ConnectorManager } from "@giba/core";
import { FakeSecurityConnector } from "@giba/connector-fake";

const manager = new ConnectorManager();
manager.register(new FakeSecurityConnector());

console.log("GIBA SECURITY GATEWAY");
console.log("Version 0.0.1-LAB");
console.log("");
console.log("Connector Manager . OK");
for (const connector of manager.list()) {
  console.log(`${connector.id.padEnd(18)} READY`);
}
console.log("");
console.log("GW-LAB-001 READY");
