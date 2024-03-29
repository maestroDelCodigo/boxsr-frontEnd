import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMsg(producto): void {
    this.subject.next(producto);
  }

  getMsg(): any {
    return this.subject.asObservable();
  }
}
