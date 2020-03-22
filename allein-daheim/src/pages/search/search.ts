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

  topics: any;
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
      .then(data => {
        this.topics = data;
        console.log(this.topics);
      })
  }

  getUsers() {
    this.apiTopicMatchingProvider.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      })
  }

  addToSelectedTopics(selectedTopic: Topic, $event) {
    var element = document.getElementById('topicButton' + selectedTopic.id);
    if ($event.checked) {
      let i = 0;
      while (i < this.selectedTopicsIds.length) {

      }

      console.log(document.getElementById('topicButton' + selectedTopic.id));
      console.log('addToSelectedTopics ' + selectedTopic.name);
      this.selectedTopicsIds.push(selectedTopic.id);
      console.log(this.selectedTopicsIds);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
}