import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTopicMatchingProvider } from '../../providers/api-topic-matching/api-topic-matching';
import { ChatRequest } from '../../providers/api-topic-matching/chat-request/chat-request';
import { Observable } from 'rxjs';
import { ApiUsersProvider } from '../../providers/api-users/api-users';
import { ChatRequestResponse } from '../../providers/api-topic-matching/chat-request/chat-request-response';
import { ChatListPage } from '../chat-list/chat-list';

@IonicPage()
@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})
export class MatchingPage {

  public loading = true;

  public infoTexts = [
    { title: "", text: "Blockierte Cookies backen", author: "" },
    { title: "", text: "Suchfunktion kalibrieren", author: "" },
    { title: "", text: "Bluescreen laden", author: "" },
    { title: "", text: "Bugs ignorieren", author: "" },
    { title: "", text: "Formular 38C ausfüllen", author: "" },
    { title: "", text: "Internet ausschalten", author: "" },
    { title: "", text: "WLAN Kabel rebooten", author: "" },
    { title: "", text: "Akkuspannung messen", author: "" },
    { title: "Zitat", text: "Irren ist menschlich, aber wenn man richtigen Mist bauen will, braucht man einen Computer.", author: "Dan Rather" },
    { title: "Zitat", text: "Mein Computer kennt Else nicht.", author: "Teilnehmer eines Programmierkurses" },
    { title: "Zitat", text: "Wir haben hier keine Zeit zu lesen, was auf dem Bildschirm steht!.", author: "Ausrede eines Anwenders, der Probleme mit der Bedienung eines Programmes hatte." },
    { title: "Zitat", text: "Fehler: Tastatur nicht angeschlossen. Bitte Taste F1 drücken!", author: "Klassische Computer-Fehlermeldung" },
    { title: "Zitat", text: "There is no reason anyone would want a computer in the home.", author: "Kenneth Olson, 1977" },
    { title: "Zitat", text: "640 Kilobyte ought to be enough for anybody.", author: "Bill Gates, 1981" },
    { title: "Zitat", text: "Der Computer löst Probleme, die man ohne ihn nicht hätte.", author: " " },
    // { title: "Zitat", text: "", author: "" },
  ]

  private selectedTopicIds: number[];
  private requestsData = new Array<ChatRequest>();
  private requests = new Array<Observable<ChatRequestResponse>>();
  private scanningForRequestAccept = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private matchService: ApiTopicMatchingProvider,
    public userController: ApiUsersProvider) {
    this.infoTexts = this.infoTexts.sort(() => (Math.random() > 0.5) ? 1 : -1);
    this.selectedTopicIds = navParams.data.topicIds;
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
      this.checkRequestAccepted(data);
    }
    this.scanningForRequestAccept = true;
  }

  onError(error: any, index: number) {
    console.log('error at index: ' + index);
    console.log(error);
    console.log(this.requestsData[index]);
  }

  z = 0;

  checkRequestAccepted(data: ChatRequestResponse) {
    console.log(data);

    this.matchService.getChatRequest(data).subscribe((acceptData) => {
      this.z++;
      if (this.z > 5) {
        this.onFound(5);
        return;
      }
      if (!acceptData) {
        setTimeout(() => this.checkRequestAccepted(data), 750);
        return;
      }
      this.loading = false
    }, (error) => {
      setTimeout(() => this.checkRequestAccepted(error), 1000);
    });
  }

  matchUserId: number;

  onFound(id: number) {
    this.matchUserId = id;
    this.loading = false;
    setTimeout(() => this.navigateToChat(), 1500);
  }

  navigateToChat() {
    this.navCtrl.push(ChatListPage, { receiverId: this.matchUserId } );
  }

  cancel() {
    this.navCtrl.pop();
  }

}
