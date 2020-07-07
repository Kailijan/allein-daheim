import { Injectable } from '@angular/core';
import { TextMessage } from 'src/app/textchat/text-message/text-message';
import { ApiUsersProvider } from '../api-users/api-users';
import { Chat } from 'src/app/chat-list/chat/chat';
import { ReplaySubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatStorageProvider {

  public currentReceiverId;

  private messageArray = new Array<TextMessage>();
  public $messages = new ReplaySubject<Array<TextMessage>>(1);

  constructor(private userService: ApiUsersProvider) {
    this.addTestData();
  }

  private async addTestData() {
    for (var i = 2; i <= 5; i++) {
      const user = await this.userService.getUser(i).pipe(take(1)).toPromise();
      for (var z = 0; z <= 1; z++) {
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
    return this.$messages.pipe(map(
      list => this.filterMessagesByChatId(list, chatId)
    ));
  }

  public getUnreadMessages(chatId: number): Observable<Array<TextMessage>> {
    return this.getMessages(chatId).pipe(map(
      (list) => list.filter((message) => {
        return message.unread;
      })
    ));
  }

  private $lastMessageList = new Map<number, ReplaySubject<TextMessage>>();
  public getLastMessage(chatId: number): Observable<TextMessage> {
    let $lastMessage = this.$lastMessageList.get(chatId);
    if (!$lastMessage) {
      $lastMessage = new ReplaySubject<TextMessage>(1);
      this.getMessages(chatId)
        .subscribe((messageList) => {
          let lastMessage = this.filterLastMessageByChatId(messageList, chatId);
          $lastMessage.next(lastMessage);
        });
      this.$lastMessageList.set(chatId, $lastMessage);
    }
    return $lastMessage;
  }

  public getChatId(message: TextMessage): number {
    return message.receiver == this.userService.getMyMessageId() ? message.sender : message.receiver;
  }

  private belongsMessageToChat(chat: Chat, message: TextMessage): boolean {
    return message.receiver == chat.receiver && message.sender == chat.sender ||
           message.receiver == chat.sender && message.sender == chat.receiver;
  }

  private $chats: ReplaySubject<Array<Chat>>;
  public getChats(): Observable<Array<Chat>> {
    if (!this.$chats) {
      this.$chats = new ReplaySubject<Array<Chat>>(1);
      this.$messages.subscribe((messageList) => {
        let chatArray = new Array<Chat>();
        for (let message of messageList) {
          if (chatArray.findIndex((chat) => this.belongsMessageToChat(chat, message)) < 0) {
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
        this.$chats.next(chatArray);
      });
    }
    return this.$chats;
  }

}