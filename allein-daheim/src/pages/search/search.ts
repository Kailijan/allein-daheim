import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiTopicMatchingProvider } from '../../providers/api-topic-matching/api-topic-matching';
import { MatchingPage } from '../matching/matching';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public selectedTopic: Topic;
  public selectedTopicsIds: number[] = [];

  public topics: Topic[];

  constructor(public navCtrl: NavController, public apiTopicMatchingProvider: ApiTopicMatchingProvider) {
    this.getTopics();
  }

  ngOnInit() {
  }

  getTopics() {
    this.apiTopicMatchingProvider.getTopics()
      .subscribe(data => {
        this.topics = data;
        console.log(this.topics);
      });
  }

  updateSelectedTopics(selectedTopic: Topic, $event) {
    if ($event.checked) {
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

  // Check if size > 0;
  sendSelectedTopicsIds() {
    this.navCtrl.push(MatchingPage, { topicIds: this.selectedTopicsIds });
  }
}
