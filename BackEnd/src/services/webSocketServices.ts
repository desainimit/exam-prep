import { IncomingMessage } from "http";
import { injectable } from "inversify";
import * as ws from "ws";
import http from "http";
import { CustomError } from "@utils";
import { log } from "console";

@injectable()
export class WebSocketService {
  private wss?: ws.Server;
  public clients: Map<string, ws> = new Map(); // Map to store clients with their IDs
  private upgradeAttached: boolean = false;

  public async startServer(server: http.Server): Promise<void> {
    this.wss = new ws.Server({ noServer: true });

    this.wss.on("listening", () => {
      log("WebSocket server started on this link: ", this.wss?.address());
    });

    this.wss.on("connection", (client: ws, req) => {
      const clientId = this.getUserIdFromRequest(req);
      if (clientId) {
        this.clients.set(clientId, client); // Store client with ID
        log(`Client connected with ID: ${clientId}`);

        client.on("close", () => {
          log(`Client disconnected: ${clientId}`);
          this.clients.delete(clientId); // Remove client when disconnected
        });
      } else {
        console.error("Client connection failed: No client ID found");
      }
    });

    this.wss.on("error", (err: any) => {
      new CustomError(500, "Error starting WebSocket server", [err]);
    });

    // Attach WebSocket handling to HTTP server's 'upgrade' event
    if (!this.upgradeAttached) {
      server.on("upgrade", (request, socket, head) => {
        this.wss?.handleUpgrade(request, socket, head, (ws) => {
          this.wss?.emit("connection", ws, request);
        });
      });
      this.upgradeAttached = true; // Set the flag to true to avoid re-attachment
    }
  }

  // Broadcast message to all connected clients
  public broadcast(event: string, data: any): void {
    if (this.wss) {
      const message = JSON.stringify({ event, data });
      this.wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          try {
            client.send(message);
          } catch (error) {
            new CustomError(500, "Error sending message to a client", [error]);
          }
        }
      });
    }
  }

  // Send message to a specific client by client ID
  public sendToClient(clientId: string, event: string, data: any): void {
    const client = this.clients.get(clientId);

    if (client && client.readyState === ws.OPEN) {
      try {
        client.send(JSON.stringify({ event, data }));
      } catch (error) {
        new CustomError(500, `Error sending message to client ${clientId}:`, [
          error,
        ]);
        this.clients.delete(clientId); // Remove from map if sending fails
      }
    } else {
      console.error(`Client with ID: ${clientId} not found or not open`);
    }
  }

  // Generate a simple unique client ID
  private getUserIdFromRequest(req: IncomingMessage): string | null {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");
    return userId && userId !== "undefined" ? userId : null;
  }

  public async closeServer(): Promise<void> {
    if (this.wss) {
      await new Promise<void>((resolve) => {
        this.wss?.close(() => {
          log("WebSocket server closed.");
          resolve();
        });
      });
    }
  }
}
