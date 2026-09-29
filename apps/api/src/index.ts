import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { FakeDvrSimulator } from "@giba/connector-fake";

const app = Fastify({ logger: true });
await app.register(websocket);

const simulator = new FakeDvrSimulator();
const clients = new Set<any>();

function broadcast(message: unknown) {
  const payload = JSON.stringify(message);
  for (const socket of clients) {
    if (socket.readyState === 1) socket.send(payload);
  }
}

app.get("/health", async () => ({
  status: "ONLINE",
  version: "0.0.1-LAB",
  gatewayId: "GW-LAB-001"
}));

app.get("/devices", async () => [{
  id: simulator.deviceId,
  name: "Fake DVR",
  manufacturer: "Giba Lab",
  model: "Fake DVR 4CH",
  status: simulator.getAggregateStatus()
}]);

app.get("/cameras", async () => simulator.getCameras());

app.get("/ws", { websocket: true }, socket => {
  clients.add(socket);
  socket.send(JSON.stringify({ type: "CONNECTED", gatewayId: "GW-LAB-001" }));
  socket.on("close", () => clients.delete(socket));
});

app.post<{Params:{id:string}}>("/lab/fake/camera/:id/offline", async request => {
  simulator.setCameraStatus(request.params.id, "OFFLINE");
  broadcast({ type:"CAMERA_STATE_CHANGED", cameraId:request.params.id, state:"OFFLINE", deviceState:simulator.getAggregateStatus() });
  return { ok:true, cameraId:request.params.id, state:"OFFLINE", deviceState:simulator.getAggregateStatus() };
});

app.post<{Params:{id:string}}>("/lab/fake/camera/:id/online", async request => {
  simulator.setCameraStatus(request.params.id, "ONLINE");
  broadcast({ type:"CAMERA_STATE_CHANGED", cameraId:request.params.id, state:"ONLINE", deviceState:simulator.getAggregateStatus() });
  return { ok:true, cameraId:request.params.id, state:"ONLINE", deviceState:simulator.getAggregateStatus() };
});

app.post("/lab/fake/reset", async () => {
  simulator.reset();
  broadcast({ type:"LAB_RESET", deviceState:"ONLINE", cameras:simulator.getCameras() });
  return { ok:true };
});

await app.listen({ host:"0.0.0.0", port:8787 });
