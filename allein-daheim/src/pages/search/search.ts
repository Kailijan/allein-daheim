import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ApiTopicMatchingProvider } from '../../providers/api-topic-matching/api-topic-matching';
import { HtmlParser } from '@angular/compiler';

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
  public selectedTopicsIds = [];
  public topicForm = new FormControl('topicName');

  // public topics = [
  //   { "id": 0, "name": "Sport", "description": "Ob Fußball, Tennis, Ballett oder Workouts, hier kommt jeder Sportsfreund auf seine Kosten!" },
  //   { "id": 1, "name": "Musik", "description": "Mozart, Britney Spears oder doch lieber BTS? Tauscht euch aus zu Justin Biebers neuestem Track oder gründet einfach eure eigene Band!" },
  //   { "id": 2, "name": "Gaming", "description": "Ihr sucht jemanden, den ihr bei CSGO so richtig fertig machen könnt? Oder würdet gerne zusammen eine eigene Welt in Minecraft erschaffen? Hier findet ihr eine/n Gleichgesinnte/n!"}
  // ];

  topics: Topic[];
  users: any;

  constructor(public navCtrl: NavController, public apiTopicMatchingProvider: ApiTopicMatchingProvider) {
    this.getTopics();
    // this.getUsers();
  }

  ngOnInit() {
    console.log(this.topics
    );
    this.topicForm.valueChanges.subscribe(change => {
      console.log(change);
    });
  }

  getTopics() {
    this.apiTopicMatchingProvider.getTopics()
      .subscribe(data => {
        this.topics = data;
        console.log(this.topics);
      })
  }

  getUsers() {
    this.apiTopicMatchingProvider.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
      })
  }

  updateSelectedTopics(selectedTopic: Topic, $event) {
    if ($event.checked) {
      // console.log(document.getElementById('topicButton' + selectedTopic.id));
      this.selectedTopicsIds.push(selectedTopic.id);
      console.log(selectedTopic.name);
      console.log(this.selectedTopicsIds);
    } else {
      this.selectedTopicsIds = this.removeFromArray(this.selectedTopicsIds, selectedTopic.id);
    }
  }

  removeFromArray(arr: any[], elementIndex: number) {
    let i = 0;
    let updatedArray = [];
    while (i < arr.length) {
      if (arr[i] != elementIndex) {
        updatedArray.push(arr[i]);
      }
      i++;
    }
    console.log(updatedArray);
    return updatedArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
}