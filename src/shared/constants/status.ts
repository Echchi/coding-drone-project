export type DroneStatus = "disconnected" | "connected" | "error";

export const DRONE_STATUS_LABELS: Record<DroneStatus, string> = {
  disconnected: "미연결",
  connected: "연결",
  error: "이상있음",
} as const;

export const STATUS = {
  DRONE_STATUS: DRONE_STATUS_LABELS,
} as const;
