
"use client";

import mqtt, { MqttClient } from "mqtt";

// In a real app, these would be environment variables
const MQTT_BROKER_URL = "ws://localhost:8083"; // Using WebSocket protocol for web

class MqttService {
  private client: MqttClient | null = null;
  private isConnected: boolean = false;

  connect(userId: string) {
    if (this.client && this.isConnected) {
      console.log("MQTT client is already connected.");
      return;
    }

    const clientId = `web_${userId}_${Math.random().toString(16).substr(2, 8)}`;

    console.log(`Connecting to MQTT broker at ${MQTT_BROKER_URL}...`);
    this.client = mqtt.connect(MQTT_BROKER_URL, {
      clientId,
      clean: true,
      reconnectPeriod: 1000,
    });

    this.client.on("connect", () => {
      console.log("MQTT Client connected.");
      this.isConnected = true;
      // You can subscribe to general topics here if needed
    });

    this.client.on("reconnect", () => {
      console.log("Reconnecting to MQTT broker...");
    });

    this.client.on("error", (err) => {
      console.error("MQTT Client error:", err);
      this.client?.end();
    });
    
    this.client.on("close", () => {
        console.log("MQTT connection closed.");
        this.isConnected = false;
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.isConnected = false;
      console.log("MQTT Client disconnected.");
    }
  }

  publish(topic: string, message: string) {
    if (this.client && this.isConnected) {
      this.client.publish(topic, message, (err) => {
        if (err) {
          console.error("Publish error:", err);
        }
      });
    } else {
      console.error("Cannot publish. MQTT client not connected.");
    }
  }

  subscribe(topic: string, onMessage: (topic: string, payload: Buffer) => void) {
    if (this.client && this.isConnected) {
      this.client.subscribe(topic, (err) => {
        if (!err) {
          this.client?.on("message", (t, p) => {
            if (t === topic) {
              onMessage(t, p);
            }
          });
        } else {
          console.error(`Subscription error for topic ${topic}:`, err);
        }
      });
    } else {
      console.error("Cannot subscribe. MQTT client not connected.");
    }
  }

  unsubscribe(topic: string) {
    if (this.client && this.isConnected) {
      this.client.unsubscribe(topic, (err) => {
        if (err) {
          console.error(`Unsubscribe error for topic ${topic}:`, err);
        }
      });
    }
  }
}

export const mqttService = new MqttService();
