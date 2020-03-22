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

  constructor(private userService: ApiUsersProvider) {
    this.addTestData();
  }

  private async addTestData() {
    for (var i = 2; i <= 5; i++) {
      const user = await this.userService.getUser(i).take(1).toPromise();
      let newMessage = {
        content: 'Hallo, ich bin ' + user.name,
        sent: new Date(),
        sender: i,
        receiver: this.userService.getMyMessageId(),
        unread: true
      };
      this.addMessage(newMessage);
      newMessage = {
        content: 'Hallo ' + user.name + '!',
        sent: new Date(),
        sender: this.userService.getMyMessageId(),
        receiver: i,
        unread: true
      };
      if (i != 5) {
        this.addMessage(newMessage);
      }
    }
  }

  private updateObservables(): void {
    this.messageArray = this.messageArray.sort((a, b) => {
      return a.sent.getTime() - b.sent.getTime();
    });
    this.$messages.next(this.messageArray);
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

  private filterLastMessageByChatId(list: Array<TextMessage>, chatId: number): TextMessage {
    let lastMessage: TextMessage;
    this.filterMessagesByChatId(list, chatId).forEach((message) => {
      if (lastMessage === undefined ||
        lastMessage.sent <= message.sent) {
        lastMessage = message;
      }
    });
    return lastMessage;
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
        let lastMessage = this.filterLastMessageByChatId(messageList, chatId);
        $lastMessage.next(lastMessage);
      });
    return $lastMessage;
  }

  public getChatId(message: TextMessage): number {
    return message.receiver == this.userService.getMyMessageId() ? message.sender : message.receiver;
  }

  public getChats(): Observable<Array<Chat>> {
    const $chats = new ReplaySubject<Array<Chat>>(1)

    this.$messages.subscribe((messageList) => {
      let chatArray = new Array<Chat>();
      for (let message of messageList) {
        if (chatArray.filter((chat) => message.receiver == chat.receiver && message.sender == chat.sender).length == 0) {
          const receiverId = this.getChatId(message);
          const lastMsg = this.getLastMessage(receiverId);
          const unreadMsg = this.getUnreadMessages(receiverId);
          chatArray.push({
            receiver: receiverId,
            sender: receiverId == message.sender ? message.receiver : message.sender,
            lastMessage: lastMsg,
            unreadMessages: unreadMsg
          });
        }
      }
      chatArray = chatArray.sort((a, b) => {
        const sentA = this.filterLastMessageByChatId(messageList, a.receiver);
        const sentB = this.filterLastMessageByChatId(messageList, b.receiver);
        return sentB.sent.getTime() - sentA.sent.getTime();
      });
      $chats.next(chatArray);
    });

    return $chats;
  }

}
