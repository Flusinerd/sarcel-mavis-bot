import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum PLAYER_STATE {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

@Injectable({
  providedIn: 'root'
})
export class BotStatusService {

  public $botStatus: BehaviorSubject<PLAYER_STATE> = new BehaviorSubject<PLAYER_STATE>(PLAYER_STATE.STOPPED);

  constructor() {
    this._subscribeToBotStatus();
  }

  private _subscribeToBotStatus() {
    console.log('subscribe to bot status');
    const eventSource = new EventSource(`/api/discord/bot/status`);
    eventSource.onmessage = this._statusHandler.bind(this);
  }

  private _statusHandler(event: MessageEvent) {
    this.$botStatus.next(event.data);
  }
}

