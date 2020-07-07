import { Component, AfterViewChecked, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TextMessage } from './text-message/text-message';
import { NavController, IonInfiniteScroll, IonInput, IonContent } from '@ionic/angular';
import { ChatStorageProvider } from '../services/chat-storage/chat-storage';
import { ApiUsersProvider } from '../services/api-users/api-users';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

const KEYCODE_ENTER = 13;

@Component({
  selector: 'page-textchat',
  templateUrl: 'textchat.html',
  styleUrls: ['textchat.scss'],
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

  @ViewChild('messageTextBox', { static: false }) messageTextBox: IonInput;
  @ViewChild('messageListElement', { static: false }) messageListElement: IonContent;

  @Input() public receiverId: number;
  @Input() public senderId: number;

  public $messsages: Observable<Array<TextMessage>>;
  public receiverName: string;

  constructor(public navCtrl: NavController,
              private chatStorage: ChatStorageProvider,
              private userService: ApiUsersProvider) {
    this.receiverId = this.chatStorage.currentReceiverId;
    this.senderId = this.userService.getMyMessageId();
    this.$messsages = this.chatStorage.getMessages(this.receiverId);
    this.chatStorage.setChatToReadState(this.receiverId);
    this.userService.getUser(this.receiverId).subscribe((user) => {
      this.receiverName = user.name;
    });

  }

  ngAfterViewChecked() {
     this.messageListElement.scrollToBottom();
  }

  messageBoxKeypress(keyCode: number) {
    if (keyCode === KEYCODE_ENTER) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.messageTextBox.value.toString().length === 0) {
      return;
    }

    const newMessage = {
      content: this.messageTextBox.value.toString(),
      sent: new Date(),
      sender: this.senderId,
      receiver: this.receiverId,
      unread: false
    };
    this.chatStorage.addMessage(newMessage);
    this.messageTextBox.value = '';
    this.messageTextBox.setFocus();
  }

}
