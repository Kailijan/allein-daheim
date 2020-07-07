import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chat } from './chat/chat';
import { ChatStorageProvider } from '../services/chat-storage/chat-storage';
import { ApiUsersProvider } from '../services/api-users/api-users';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
  styleUrls: ['chat-list.scss'],
})
export class ChatListPage {

  public $chats: Observable<Array<Chat>>;

  constructor(public navCtrl: NavController,
              private chatStorage: ChatStorageProvider,
              public userController: ApiUsersProvider) {
    this.$chats = this.chatStorage.getChats();
    // TODO
    // if (this.navParams.data.receiverId) {
    //   this.showChatById(this.navParams.data.receiverId);
    // }
  }

  showChat(chat: Chat) {
    this.showChatById(chat.receiver);
  }

  showChatById(receiverId: number) {
    this.chatStorage.currentReceiverId = receiverId;
    this.navCtrl.navigateForward('/textchat');
  }
}
