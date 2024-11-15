import { inject, Injectable, InjectionToken } from '@angular/core';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TokenService } from './token.service';

export const websocket_Url = new InjectionToken<string>('websocket_Url');

interface WebSocketMessage {
  event: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private websocket_Url = inject(websocket_Url);
  private tokenService = inject(TokenService);
  private socket$!: WebSocketSubject<any>;

  // Subject to store incoming messages
  private messageSubject$ = new Subject<WebSocketMessage>();

  constructor() {
    if (this.tokenService.isTokenAvailable('accessToken')) {
      this.connect();
    }
  }

  public connect() {
    const user = this.tokenService.getUserData();
    const websocket_Url = this.websocket_Url + `?userId=${user?._id}`;
    const config: WebSocketSubjectConfig<any> = {
      url: websocket_Url,
      deserializer: (e: MessageEvent) => {
        try {
          return JSON.parse(e.data); // Try to parse as JSON
        } catch {
          return e.data; // Return as plain text if it's not JSON
        }
      },
    };
    this.socket$ = new WebSocketSubject(config);

    // Handle incoming messages and push them to the messageSubject
    this.socket$.subscribe({
      next: (message) => {
        this.onMessage(message);
      },
      error: (err) => console.error(err),
    });
  }

  // Send message to WebSocket server
  public sendMessage(msg: string): void {
    this.socket$.next(msg);
  }

  // Handle incoming messages
  private onMessage(message: any): void {
    if (message?.event) {
      this.messageSubject$.next(message); // Push to the Subject
    }
  }

  // Filter messages by event name and return an Observable
  public onEvent<T>(eventName: string): Observable<T> {
    return this.messageSubject$.pipe(
      filter((message: WebSocketMessage) => message.event === eventName),
      map((message: WebSocketMessage) => message.data)
    );
  }

  // Close connection
  public close(): void {
    this.socket$.complete();
  }
}
