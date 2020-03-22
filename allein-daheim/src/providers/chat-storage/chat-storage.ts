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

  private myMessageId: number;

  constructor(userService: ApiUsersProvider) {
    this.myMessageId = 10;
    userService.addUser(this.myMessageId, 'Ich');

    const names = [
      'Peter',
      'Sandra',
      'Max',
      'Britney',
      'Kai',
      'Mario',
      'Egbert',
      'Tina'
    ]

    for (var i = 0; i < 8; i++) {
      userService.addUser(i, names[i]);
      let newMessage = {
        content:  'Hallo, ich bin ' + names[i],
        sent:     new Date(),
        sender:   i,
        receiver: this.myMessageId,
        unread:   true };
      this.addMessage(newMessage);
      newMessage = {
          content:  'Hallo ' + names[i] + '!',
          sent:     new Date(),
          sender:   this.myMessageId,
          receiver: i,
          unread:   true };
      this.addMessage(newMessage);
    }
  }

  private updateObservables(): void {
    this.$messages.next(this.messageArray);
  }

  public getMyMessageId(): number {
    return this.myMessageId;
  }

  public addMessage(message: TextMessage) {
    this.messageArray.push(message);
    this.updateObservables();
  }

  private filterMessagesByChatId(list: Array<TextMessage>, chatId: number): TextMessage[] {
    return list.filter((message) => {
      return message.receiver == chatId || message.sender == chatId;
    });
  }

  public setChatToReadState(chatId: number): void {
    for (let message of this.filterMessagesByChatId(this.messageArray, chatId)) {
      message.unread = false;
    }
    this.updateObservables();
  }

  public getMessages(chatId: number): Observable<Array<TextMessage>> {
    return this.$messages.map(
      list => this.filterMessagesByChatId(list, chatId)
    );
  }

  public getUnreadMessages(chatId: number): Observable<Array<TextMessage>> {
    return this.getMessages(chatId).map(
      (list) => list.filter((message) => {
        return message.unread;
      })
    );
  }

  public getLastMessage(chatId: number): Observable<TextMessage> {
    const $lastMessage = new ReplaySubject<TextMessage>(1);
    this.getMessages(chatId)
          .subscribe((messageList) => {
            let lastMessage: TextMessage;
            for (let message of messageList) {
              if (lastMessage === undefined ||
                  lastMessage.sent <= message.sent) {
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
          const unreadMsg = this.getUnreadMessages(receiverId);
          messageArray.push({ receiver: receiverId,
                              sender: receiverId == message.sender ? message.receiver : message.sender,
                              lastMessage: lastMsg,
                              unreadMessages: unreadMsg });
        }
      }
      $chats.next(messageArray);
    });

    return $chats;
  }

}
