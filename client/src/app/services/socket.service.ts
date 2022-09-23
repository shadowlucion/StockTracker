import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {io} from 'socket.io-client'
import {Observable, Subscriber} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  readonly url:string = 'http://localhost:3000/';
  constructor() {
    this.socket = io(this.url,{ transports: ['websocket', 'polling', 'flashsocket'] })
  }
  socket:any;


  listen(eventName:string){
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        Subscriber.next(data)
      })
    })
  }


  emit(eventName:string,data:any){
      this.socket.emit(eventName,data);
  }


  // stockAdded(){
  //   this.socket.emit('stockAdded');
  // }
  // updateStockList(){
  //   return this.socket.fromEvent('updateStockList');
  // }
}
