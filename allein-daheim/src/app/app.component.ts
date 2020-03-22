import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { MatchingPage } from '../pages/matching/matching';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Startseite', component: SearchPage },
      { title: 'List', component: ListPage },
      { title: 'Chats', component: ChatListPage },
      { title: 'Matching', component: MatchingPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'Matching') {
      this.nav.push(page.component);
      return;
    }
    this.nav.setRoot(page.component);
  }
}
