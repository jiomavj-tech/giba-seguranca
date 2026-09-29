import type { CurrentState } from "@giba/shared";

export class StateEngine {
  private readonly states = new Map<string, CurrentState>();

  set<T>(state: CurrentState<T>): CurrentState<T> {
    this.states.set(state.entityId, state as CurrentState);
    return state;
  }

  get<T = unknown>(entityId: string): CurrentState<T> | undefined {
    return this.states.get(entityId) as CurrentState<T> | undefined;
  }

  markStale(entityId: string): CurrentState | undefined {
    const current = this.states.get(entityId);
    if (!current) return undefined;
    const stale = { ...current, confidence: "STALE" as const };
    this.states.set(entityId, stale);
    return stale;
  }
}
