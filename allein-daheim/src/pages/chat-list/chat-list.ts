import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Chat } from './chat/chat';
import { ChatStorageProvider } from '../../providers/chat-storage/chat-storage';
import { ApiUsersProvider } from '../../providers/api-users/api-users';
import { TextchatPage } from '../textchat/textchat';

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  public $chats: Observable<Array<Chat>>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    chatStorage: ChatStorageProvider,
    public userController: ApiUsersProvider) {
    this.$chats = chatStorage.getChats();
  }

  showChat(chat: Chat) {
    this.navCtrl.push(TextchatPage, { receiveId: chat.receiver, sendId: chat.sender });
  }

}
