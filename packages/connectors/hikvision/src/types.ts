export interface HikvisionCredentials {
  username: string;
  password: string;
}

export interface HikvisionConnection {
  host: string;
  port?: number;
  credentials: HikvisionCredentials;
  protocol?: "http" | "https";
}

export interface HikvisionProbeResult {
  reachable: boolean;
  authenticated: boolean;
  isapi: boolean;
  identity?: {
    manufacturer?: string;
    model?: string;
    serial?: string;
    firmware?: string;
  };
  errors: string[];
}
