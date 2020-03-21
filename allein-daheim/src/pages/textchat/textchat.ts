import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextchatPage');
  }

  messageBoxKeypress(keyCode: number) {
    if (keyCode == KEYCODE_ENTER) {
      this.messageTextBox.value = '';
    }
  }

}
