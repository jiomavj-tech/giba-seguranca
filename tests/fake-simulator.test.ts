import { describe, expect, it } from "vitest";
import { FakeDvrSimulator } from "../packages/connectors/fake/src/simulator.js";

describe("FakeDvrSimulator", () => {
  it("FAKE-002 exposes four cameras", () => {
    const sim = new FakeDvrSimulator();
    expect(sim.getCameras()).toHaveLength(4);
  });

  it("FAKE-003/004 makes DVR degraded when CAM03 is offline", () => {
    const sim = new FakeDvrSimulator();
    sim.setCameraStatus("CAM-FAKE-003", "OFFLINE");
    expect(sim.getAggregateStatus()).toBe("DEGRADED");
  });

  it("FAKE-005/006 restores healthy state", () => {
    const sim = new FakeDvrSimulator();
    sim.setCameraStatus("CAM-FAKE-003", "OFFLINE");
    sim.setCameraStatus("CAM-FAKE-003", "ONLINE");
    expect(sim.getAggregateStatus()).toBe("ONLINE");
  });
});
