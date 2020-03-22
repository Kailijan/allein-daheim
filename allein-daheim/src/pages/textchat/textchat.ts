import { Component, ViewChild, trigger, state, style, transition, animate, AfterViewChecked, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatStorageProvider } from '../../providers/chat-storage/chat-storage';
import { Observable } from 'rxjs/Observable';
import { TextMessage } from './text-message/text-message';
import { ApiUsersProvider } from '../../providers/api-users/api-users';

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

  @Input() public receiverId: number;
  @Input() public senderId: number;

  public $messsages: Observable<Array<TextMessage>>;
  public receiverName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private chatStorage: ChatStorageProvider,
              private userService: ApiUsersProvider) {
    this.receiverId = navParams.data.receiveId;
    this.senderId = navParams.data.sendId;
    this.$messsages = this.chatStorage.getMessages(this.receiverId);
    this.chatStorage.setChatToReadState(this.receiverId);
    this.userService.getUser(this.receiverId).subscribe((user) => {
      this.receiverName = user.name;
    });
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
                         receiver: this.receiverId,
                         unread:   false };
    this.chatStorage.addMessage(newMessage);
    this.messageTextBox.value = '';
  }

}
