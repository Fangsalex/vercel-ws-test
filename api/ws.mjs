import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const server = createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("[WS] Client connected");

  ws.send(JSON.stringify({
    type: "connected",
    message: "Vercel WebSocket connected"
  }));

  ws.on("message", (data) => {
    const message = data.toString();

    console.log("[WS] Received:", message);

    ws.send(JSON.stringify({
      type: "echo",
      message: message,
      timestamp: new Date().toISOString()
    }));
  });

  ws.on("close", () => {
    console.log("[WS] Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("[WS] Error:", error.message);
  });
});

export default server;
