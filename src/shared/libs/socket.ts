import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): SocketManager {
    if (!this.instance) {
      this.instance = new SocketManager();
    }
    return this.instance;
  }

  connect(namespace: string = "") {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(`${import.meta.env.VITE_WS_URL}${namespace}`, {
      transports: ["websocket"],
      auth: {
        token: sessionStorage.getItem("access_token"),
      },
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketManager = SocketManager.getInstance();
