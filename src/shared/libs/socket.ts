import { io, Socket } from "socket.io-client";

interface SocketManagerConfig {
  url?: string;
  options?: {
    transports?: string[];
    timeout?: number;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
  };
}

class SocketManager {
  private static instance: SocketManager;
  private sockets: Map<string, Socket> = new Map();
  private config: SocketManagerConfig;

  private constructor(config: SocketManagerConfig = {}) {
    this.config = {
      url: config.url || import.meta.env.VITE_WS_URL || "http://localhost:3001",
      options: {
        transports: ["websocket", "polling"],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        ...config.options,
      },
    };
  }

  static getInstance(config?: SocketManagerConfig): SocketManager {
    if (!this.instance) {
      this.instance = new SocketManager(config);
    }
    return this.instance;
  }

  connect(namespace: string = "/"): Socket {
    const existingSocket = this.sockets.get(namespace);
    if (existingSocket?.connected) {
      return existingSocket;
    }

    // 기존 소켓이 있다면 정리
    if (existingSocket) {
      existingSocket.removeAllListeners();
      existingSocket.disconnect();
      this.sockets.delete(namespace);
    }

    const socket = io(`${this.config.url}${namespace}`, this.config.options);

    // 기본 이벤트 리스너 설정
    socket.on("connect", () => {
      console.log(`✅ Socket connected to ${namespace}`);
    });

    socket.on("disconnect", (reason: string) => {
      console.log(`❌ Socket disconnected from ${namespace}:`, reason);
    });

    socket.on("connect_error", (error: Error) => {
      console.error(`🚨 Socket connection error for ${namespace}:`, error.message);
    });

    this.sockets.set(namespace, socket);
    return socket;
  }

  disconnect(namespace: string): void {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      this.sockets.delete(namespace);
      console.log(`🔌 Socket disconnected from ${namespace}`);
    }
  }

  disconnectAll(): void {
    this.sockets.forEach((socket, namespace) => {
      socket.removeAllListeners();
      socket.disconnect();
      console.log(`🔌 Socket disconnected from ${namespace}`);
    });
    this.sockets.clear();
  }

  getSocket(namespace: string): Socket | undefined {
    return this.sockets.get(namespace);
  }

  isConnected(namespace: string): boolean {
    const socket = this.sockets.get(namespace);
    return socket?.connected ?? false;
  }

  // 모든 소켓의 연결 상태 확인
  getAllConnectionStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    this.sockets.forEach((socket, namespace) => {
      status[namespace] = socket.connected;
    });
    return status;
  }
}

// 싱글톤 인스턴스 export
export const socketManager = SocketManager.getInstance();
