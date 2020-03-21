import { Component, ViewChild, trigger, state, style, transition, animate, AfterViewChecked, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatStorageProvider } from '../../providers/chat-storage/chat-storage';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs/Observable';
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
export class TextchatPage implements AfterViewChecked {

  @ViewChild('messageTextBox') messageTextBox;
  @ViewChild('messageListElement') messageListElement;

  @Input() receiverId;
  @Input() senderId;

  public $messsages: Observable<Array<TextMessage>>;

  public receiverName = 'Peter';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private chatStorage: ChatStorageProvider) {
    this.$messsages = this.chatStorage.getMessages(this.receiverId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextchatPage');
  }

  ngAfterViewChecked() {
    this.messageListElement.scrollToBottom();
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
                         sender:   this.senderId,
                         receiver: this.receiverId };
    this.chatStorage.addMessage(newMessage);
    this.messageTextBox.value = '';
  }

}
