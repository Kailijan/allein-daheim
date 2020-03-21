import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl} from '@angular/forms';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public selectedTopic: Topic;
  public topicForm = new FormControl('topicName');

  public topicList = [
    { "id": 0, "name": "Sport", "description": "Ob Fußball, Tennis, Ballett oder Workouts, hier kommt jeder Sportsfreund auf seine Kosten!" },
    { "id": 1, "name": "Musik", "description": "Mozart, Britney Spears oder doch lieber BTS? Tauscht euch aus zu Justin Biebers neuestem Track oder gründet einfach eure eigene Band!" },
    { "id": 2, "name": "Gaming", "description": "Ihr sucht jemanden, den ihr bei CSGO so richtig fertig machen könnt? Oder würdet gerne zusammen eine eigene Welt in Minecraft erschaffen? Hier findet ihr eine/n Gleichgesinnte/n!"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {

    console.log(this.topicList);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  logCurrentTopic() {
    console.log(this.topicForm.value);
  }
}
