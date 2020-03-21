import { Injectable } from '@angular/core';
import { TextMessage } from '../../pages/textchat/text-message/text-message';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';
import { Chat } from '../../pages/chat-list/chat/chat';
import { ApiUsersProvider } from '../api-users/api-users';

@Injectable()
export class ChatStorageProvider {

  private messageArray = new Array<TextMessage>();
  public $messages = new ReplaySubject<Array<TextMessage>>(1);

  private myMessageId = 50;


  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
  makeid(length): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  constructor(private userService: ApiUsersProvider) {
    this.myMessageId = this.getRandomInt(3030);
    userService.addUser(this.myMessageId, 'Ich bins');
    for (var i = 0; i < 8; i++) {
      const newMessage = {
        content:  this.makeid(this.getRandomInt(235)),
        sent:     new Date(),
        sender:   this.getRandomInt(3030),
        receiver: this.myMessageId };
      userService.addUser(newMessage.sender, Math.random().toString(36));
      this.addMessage(newMessage);
    }
    for (var z = 0; z < 8; z++) {
      const rec = this.getRandomInt(3030);
      const newMessage = {
        content:  this.makeid(this.getRandomInt(535)),
        sent:     new Date(),
        sender:   this.myMessageId,
        receiver: rec};
      userService.addUser(newMessage.receiver, Math.random().toString(36));
      this.addMessage(newMessage);
    }
  }

  public getMyMessageId(): number {
    return this.myMessageId;
  }

  public addMessage(message: TextMessage) {
    this.messageArray.push(message);
    this.$messages.next(this.messageArray);
  }

  public getMessages(chatId: number): Observable<Array<TextMessage>> {
    return this.$messages.map(
      (list) => list.filter((message) => {
        return message.receiver == chatId || message.sender == chatId;
    }));
  }

  public getLastMessage(chatId: number): Observable<TextMessage> {
    const $lastMessage = new ReplaySubject<TextMessage>(1);
    this.getMessages(chatId)
          .subscribe((messageList) => {
            let lastMessage: TextMessage;
            for (let message of messageList) {
              if (lastMessage === undefined ||
                  lastMessage.sent < message.sent) {
                    lastMessage = message;
                  }
            }
            $lastMessage.next(lastMessage);
          });
    return $lastMessage;
  }

  public getChatId(message: TextMessage): number {
    return message.receiver == this.myMessageId ? message.sender : message.receiver;
  }



  public getChats(): Observable<Array<Chat>> {
    const $chats = new ReplaySubject<Array<Chat>>(1)

    this.$messages.subscribe((messageList) => {
      const messageArray = new Array<Chat>();
      for (let message of messageList) {
        if (messageArray.filter((chat) => message.receiver == chat.receiver && message.sender == chat.sender).length == 0) {
          const receiverId = this.getChatId(message);
          const lastMsg = this.getLastMessage(receiverId);
          messageArray.push({ receiver: receiverId, sender: receiverId == message.sender ? message.receiver : message.sender, lastMessage: lastMsg });
        }
      }
      $chats.next(messageArray);
    });

    return $chats;
  }

}
