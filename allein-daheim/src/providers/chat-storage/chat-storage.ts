import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TextMessage } from '../../pages/textchat/text-message/text-message';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ChatStorageProvider {

  private messageArray = new Array<TextMessage>();
  public $messages = new ReplaySubject<Array<TextMessage>>(1);
  public receiverId = 20;

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor() {
    for (var i = 0; i < 8; i++) {
      const newMessage = {
        content:  Math.random().toString(36),
        sent:     new Date(),
        sender:   0,
        receiver: this.getRandomInt(2) == 1 ? this.receiverId : 0};
      this.addMessage(newMessage)
    }
    const newMessage = {
      content:  "alksdjflkasdlkfakjsdfkjaskdjfklasdjkfkjasdjkfhsakjdfhasdkjfhaskdjfhaksjldfhakjsdhfkjasdhf asdkjfhaksjdhfkajshdf kjasdhfkjahsdfkjhasdkjfhaksjdfhaksjdhfkjasdhkfjashdfkjashdfkjasdhfkjasdhfkjasdhfkjashdfkjahsdkfjhasdkfjhasdkjfhaksjkdfhaskdjfhaksjdfh",
      sent:     new Date(),
      sender:   0,
      receiver: this.getRandomInt(2) == 1 ? this.receiverId : 0};
    this.addMessage(newMessage)
  }

  public addMessage(message: TextMessage) {
    this.messageArray.push(message);
    this.$messages.next(this.messageArray);
  }

  public getMessages(receiverId: number): Observable<Array<TextMessage>> {
    return this.$messages.map(
      (list) => list.filter((message) => {
        return message.receiver == receiverId || message.sender == receiverId;
    }));
  }

}
