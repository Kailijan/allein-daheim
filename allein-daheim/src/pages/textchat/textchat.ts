import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { TextMessage } from './text-message/text-message';

/**
 * Generated class for the TextchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const KEYCODE_ENTER = 13;

@IonicPage()
@Component({
  selector: 'page-textchat',
  templateUrl: 'textchat.html',
})
export class TextchatPage {

  @ViewChild('messageTextBox') messageTextBox;

  public receiverName = 'Peter';
  public messages: Array<TextMessage>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = new Array<TextMessage>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextchatPage');
  }

  messageBoxKeypress(keyCode: number) {
    if (keyCode == KEYCODE_ENTER) {
      this.messageTextBox.value = '';
      this.sendMessage();
    }
  }

  sendMessage() {
    this.messages.push({ message: this.messageTextBox.value, sent: new Date(), sender: 0, receiver: 0 });
  }
}
