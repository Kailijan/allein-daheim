import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Chat } from './chat/chat';
import { ChatStorageProvider } from '../../providers/chat-storage/chat-storage';
import { ApiUsersProvider } from '../../providers/api-users/api-users';
import { TextchatPage } from '../textchat/textchat';

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  public $messsages: Observable<Array<Chat>>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chatStorage: ChatStorageProvider,
    public userController: ApiUsersProvider) {
    this.$messsages = chatStorage.getChats();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }

  showChat(chat: Chat) {
    this.navCtrl.push(TextchatPage, { receiveId: chat.receiver, sendId: chat.sender });
  }

}
