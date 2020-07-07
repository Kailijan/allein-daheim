import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiTopicMatchingProvider } from '../services/api-topic-matching/api-topic-matching';
import { TopicMockList } from '../services/api-topic-matching/topic-mock-list';
import { MatchingPage } from '../matching/matching';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styleUrls: ['search.scss'],
})
export class SearchPage {

  public selectedTopic: Topic;
  public selectedTopicsIds: number[] = [];

  public topics: Topic[];
  public loadingTopics = true;

  public topicIcons = [
    'people',
    'book',
    'game-controller-b',
    'chatboxes',
    'information-circle',
    'musical-note',
    'football'
  ];

  constructor(public navCtrl: NavController, public apiTopicMatchingProvider: ApiTopicMatchingProvider) {
    this.getTopics();
  }

  getTopics() {
    this.loadingTopics = true;
    this.apiTopicMatchingProvider.getTopics()
      .subscribe(data => {
        this.loadingTopics = false;
        this.topics = data;
        console.log(this.topics);
      },
      (error) => {
        this.loadingTopics = false;
        console.log('Fehler beim laden der Topics => Fallback');
        console.log(error);
        this.topics = TopicMockList;
      });
  }

  updateSelectedTopics(selectedTopic: Topic, checked: boolean) {
    if (checked) {
      this.selectedTopicsIds.push(selectedTopic.id);
      console.log(selectedTopic.name);
      console.log(this.selectedTopicsIds);
    } else {
      console.log('remove: ' + selectedTopic.name);
      const removeIndex = this.selectedTopicsIds.indexOf(selectedTopic.id);
      if (removeIndex >= 0) {
        this.selectedTopicsIds.splice(removeIndex, 1);
      }
    }
  }

  // TODO: Check if size > 0;
  sendSelectedTopicsIds() {
    this.apiTopicMatchingProvider.selectedTopicId = this.selectedTopicsIds;
    this.navCtrl.navigateForward('/matching');
  }
}
