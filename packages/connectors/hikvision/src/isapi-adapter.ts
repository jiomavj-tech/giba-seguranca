import type { HikvisionConnection, HikvisionProbeResult } from "./types.js";

/**
 * LAB adapter.
 *
 * Important: authentication and XML parsing are deliberately isolated here.
 * We do not mark a capability as LAB_VERIFIED until a physical device test passes.
 */
export class IsapiAdapter {
  constructor(private readonly connection: HikvisionConnection) {}

  private baseUrl(): string {
    const protocol = this.connection.protocol ?? "http";
    const port = this.connection.port ?? (protocol === "https" ? 443 : 80);
    return `${protocol}://${this.connection.host}:${port}`;
  }

  async probe(): Promise<HikvisionProbeResult> {
    const result: HikvisionProbeResult = {
      reachable: false,
      authenticated: false,
      isapi: false,
      errors: []
    };

    try {
      // Identification endpoint is kept in one adapter so it can be changed
      // after exact model/firmware validation without affecting Giba Core.
      const response = await fetch(`${this.baseUrl()}/ISAPI/System/deviceInfo`, {
        method: "GET",
        headers: { Accept: "application/xml" },
        signal: AbortSignal.timeout(5000)
      });

      result.reachable = true;

      if (response.status === 401) {
        result.errors.push("AUTH_REQUIRED");
        return result;
      }

      if (!response.ok) {
        result.errors.push(`HTTP_${response.status}`);
        return result;
      }

      result.isapi = true;
      result.authenticated = true;
      const xml = await response.text();
      result.identity = {
        manufacturer: readXml(xml, "manufacturer"),
        model: readXml(xml, "model"),
        serial: readXml(xml, "serialNumber"),
        firmware: readXml(xml, "firmwareVersion")
      };
      return result;
    } catch (error) {
      result.errors.push(error instanceof Error ? error.name : "NETWORK_ERROR");
      return result;
    }
  }
}

function readXml(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match?.[1]?.trim() || undefined;
}
