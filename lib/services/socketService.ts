
"use client";

import { io, Socket } from "socket.io-client";

// In a real app, these would be environment variables
const SOCKET_SERVERS = [
    process.env.NEXT_PUBLIC_PRIMARY_SOCKET_URL || "wss://primary-region.example.com",
    process.env.NEXT_PUBLIC_SECONDARY_SOCKET_URL || "wss://secondary-region.example.com",
];
const LOCAL_SOCKET_SERVER = "http://localhost:3001";

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;
  private role: string | null = null;
  private serverIndex = 0;
  private isDevelopment = false;

  connect(userId: string, role: string) {
    if (this.socket?.connected) {
      if (this.userId !== userId) {
        this.disconnect();
      } else {
        return;
      }
    }
    
    if (typeof window !== 'undefined') {
        this.isDevelopment = window.location.hostname === 'localhost';
    }

    this.userId = userId;
    this.role = role;
    this.serverIndex = 0;
    
    this.attemptConnection();
  }

  private attemptConnection() {
    if (!this.userId || !this.role) {
        console.error("User ID and role must be set before connecting.");
        return;
    }

    const mockPayload = JSON.stringify({ userId: this.userId, role: this.role, iat: Date.now() });
    const token = `mock-header.${btoa(mockPayload)}.mock-signature`;
    
    let serverUrl: string;

    if (this.isDevelopment) {
      serverUrl = LOCAL_SOCKET_SERVER;
    } else {
      serverUrl = SOCKET_SERVERS[this.serverIndex];
    }
    
    console.log(`Attempting to connect to socket server at ${serverUrl} for user ${this.userId}...`);

    this.socket = io(serverUrl, {
      auth: { token },
      reconnection: false, 
    });

    this.socket.on("connect", () => {
      console.log(`Socket connected with ID: ${this.socket?.id} to ${serverUrl} for user ${this.userId}`);
      this.socket?.emit('user-connected', { userId: this.userId });
    });

    this.socket.on("connect_error", (err) => {
      console.error(`Failed to connect to ${serverUrl}:`, err.message);
      this.socket?.close();
      
      // Only attempt failover if in a production environment and there are more servers to try
      if (!this.isDevelopment && this.serverIndex < SOCKET_SERVERS.length - 1) {
          this.serverIndex++;
          console.log("Attempting to connect to the next server...");
          this.attemptConnection();
      } else if (this.isDevelopment) {
        console.error("Local socket connection failed. Make sure your local socket server is running on port 3001.");
      }
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  }

  disconnect() {
    if (this.socket) {
      console.log(`Disconnecting socket for user ${this.userId}`);
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
      this.role = null;
    }
  }

  emit(eventName: string, data?: any, ack?: (response: any) => void) {
    if (this.socket?.connected) {
      this.socket.emit(eventName, data, ack);
    } else {
      console.error(`Socket not connected. Cannot emit event "${eventName}".`);
    }
  }

  on(eventName: string, callback: (data: any) => void) {
    this.socket?.on(eventName, callback);
  }

  off(eventName: string, callback?: (data: any) => void) {
    this.socket?.off(eventName, callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
  
  getUserId(): string | null {
    return this.userId;
  }
}

export const socketService = new SocketService();
