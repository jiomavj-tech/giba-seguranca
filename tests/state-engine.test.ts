import { describe, expect, it } from "vitest";
import { StateEngine } from "../packages/core/src/state-engine.js";

describe("StateEngine", () => {
  it("stores and marks a state stale", () => {
    const engine = new StateEngine();
    engine.set({ entityId:"CAM-001", value:"ONLINE", confidence:"CONFIRMED", source:"CONNECTOR", updatedAt:new Date().toISOString() });
    expect(engine.get("CAM-001")?.value).toBe("ONLINE");
    expect(engine.markStale("CAM-001")?.confidence).toBe("STALE");
  });
});
