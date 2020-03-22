import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.infoTexts = this.infoTexts.sort(() => (Math.random() > 0.5) ? 1 : -1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchingPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

}
