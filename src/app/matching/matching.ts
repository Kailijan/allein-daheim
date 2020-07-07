import { Component } from '@angular/core';
import { ChatRequest } from '../services/api-topic-matching/chat-request/chat-request';
import { Observable } from 'rxjs';
import { ChatRequestResponse } from '../services/api-topic-matching/chat-request/chat-request-response';
import { NavController, NavParams } from '@ionic/angular';
import { ApiTopicMatchingProvider } from '../services/api-topic-matching/api-topic-matching';
import { ApiUsersProvider } from '../services/api-users/api-users';
import { ChatListPage } from '../chat-list/chat-list';
import { ChatStorageProvider } from '../services/chat-storage/chat-storage';

@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
  styleUrls: ['matching.scss'],
})
export class MatchingPage {

  public loading = true;

  public infoTexts = [
    { title: '', text: 'Blockierte Cookies backen', author: '' },
    { title: '', text: 'Suchfunktion kalibrieren', author: '' },
    { title: '', text: 'Bluescreen laden', author: '' },
    { title: '', text: 'Bugs ignorieren', author: '' },
    { title: '', text: 'Formular 38C ausfüllen', author: '' },
    { title: '', text: 'Internet ausschalten', author: '' },
    { title: '', text: 'WLAN Kabel rebooten', author: '' },
    { title: '', text: 'Akkuspannung messen', author: '' },
    { title: 'Zitat', text: 'Irren ist menschlich, aber wenn man richtigen Mist bauen will, braucht man einen Computer.', author: 'Dan Rather' },
    { title: 'Zitat', text: 'Mein Computer kennt Else nicht.', author: 'Teilnehmer eines Programmierkurses' },
    { title: 'Zitat', text: 'Wir haben hier keine Zeit zu lesen, was auf dem Bildschirm steht!.', author: 'Ausrede eines Anwenders, der Probleme mit der Bedienung eines Programmes hatte.' },
    { title: 'Zitat', text: 'Fehler: Tastatur nicht angeschlossen. Bitte Taste F1 drücken!', author: 'Klassische Computer-Fehlermeldung' },
    { title: 'Zitat', text: 'There is no reason anyone would want a computer in the home.', author: 'Kenneth Olson, 1977' },
    { title: 'Zitat', text: '640 Kilobyte ought to be enough for anybody.', author: 'Bill Gates, 1981' },
    { title: 'Zitat', text: 'Der Computer löst Probleme, die man ohne ihn nicht hätte.', author: ' ' },
    // { title: "Zitat", text: "", author: "" },
  ]

  private selectedTopicIds: number[];
  private requestsData = new Array<ChatRequest>();
  private requests = new Array<Observable<ChatRequestResponse>>();
  private scanningForRequestAccept = false;

  private scanningErrorCounter: number;

  constructor(public navCtrl: NavController,
              private chatStorage: ChatStorageProvider,
              private matchService: ApiTopicMatchingProvider,
              public userController: ApiUsersProvider) {
    this.infoTexts = this.infoTexts.sort(() => (Math.random() > 0.5) ? 1 : -1);
    this.selectedTopicIds = this.matchService.selectedTopicId;
    if (!this.selectedTopicIds) {
      this.selectedTopicIds = [ 2, 3 ];
    }
    for (let i = 0; i < this.selectedTopicIds.length; i++) {
      const data = {
        topicId: this.selectedTopicIds[i],
        userId: this.userController.getMyMessageId()
      };
      const $request = this.matchService.createNewChatRequest(data);
      $request.subscribe(
        (response) => this.onResponse(response, i),
        (error) => this.onError(error, i)
      )
      this.requestsData.push(data);
      this.requests.push($request);
    }
  }

  onResponse(data: ChatRequestResponse, index: number) {
    console.log('requestCreation success' + index);
    console.log(data);
    if (!this.scanningForRequestAccept) {
      this.scanningErrorCounter = 0;
      this.checkRequestAccepted(data);
    }
    this.scanningForRequestAccept = true;
  }

  onError(error: any, index: number) {
    console.log('error at index: ' + index);
    console.log(error);
    console.log(this.requestsData[index]);
    this.fakeUserFound(3500);
  }

  z = 0;

  checkRequestAccepted(data: ChatRequestResponse) {
    console.log(data);

    this.matchService.getChatRequest(data).subscribe((acceptData) => {
      if (!acceptData) {
        setTimeout(() => this.checkRequestAccepted(data), 750);
        return;
      }
      this.loading = false
    }, (error) => {
      this.scanningErrorCounter++;
      if (this.scanningErrorCounter > 5) {
        this.fakeUserFound(0);
      } else {
        setTimeout(() => this.checkRequestAccepted(error), 1000);
      }
    });
  }

  private showFakeUser = false;
  fakeUserFound(timeout: number) {
    if (this.showFakeUser)
      return;
    this.showFakeUser = true;
    const fakeUserId = 5;
    setTimeout(() => this.onFound(fakeUserId), timeout);
  }

  public matchUserId: number;

  onFound(id: number) {
    this.matchUserId = id;
    this.loading = false;
    //setTimeout(() => this.navigateToChat(), 1500);
  }

  navigateToChat() {
    this.chatStorage.currentReceiverId = this.matchUserId;
    this.navCtrl.navigateForward('/chats');
  }

  cancel() {
    this.navCtrl.back();
  }

}
