import { Component, ViewChild, ElementRef, trigger, state, style, transition, animate, ViewChildren } from '@angular/core';
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
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0.1,
        transform: 'translateY(10%)'
      })),
      transition('void => *', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class TextchatPage {

  @ViewChild('messageTextBox') messageTextBox;
  @ViewChild('messageListElement') messageListElement;

  public receiverName = 'Peter';
  public receiverId = 20;
  public messages: Array<TextMessage>;

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = new Array<TextMessage>();
    for (var i = 0; i < 8; i++) {
      const newMessage = {
        content:  Math.random().toString(36),
        sent:     new Date(),
        sender:   0,
        receiver: this.getRandomInt(2) == 1 ? this.receiverId : 0};
      this.messages.push(newMessage)
    }
    const newMessage = {
      content:  "alksdjflkasdlkfakjsdfkjaskdjfklasdjkfkjasdjkfhsakjdfhasdkjfhaskdjfhaksjldfhakjsdhfkjasdhf asdkjfhaksjdhfkajshdf kjasdhfkjahsdfkjhasdkjfhaksjdfhaksjdhfkjasdhkfjashdfkjashdfkjasdhfkjasdhfkjasdhfkjashdfkjahsdkfjhasdkfjhasdkjfhaksjkdfhaskdjfhaksjdfh",
      sent:     new Date(),
      sender:   0,
      receiver: this.getRandomInt(2) == 1 ? this.receiverId : 0};
    this.messages.push(newMessage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextchatPage');
  }

  messageBoxKeypress(keyCode: number) {
    if (keyCode == KEYCODE_ENTER) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.messageTextBox.value.length == 0) {
      return;
    }

    const newMessage = { content:  this.messageTextBox.value,
                         sent:     new Date(),
                         sender:   0,
                         receiver: this.receiverId };
    this.messages.push(newMessage);
    this.messageListElement.scrollToBottom();
    this.messageTextBox.value = '';
  }
}
