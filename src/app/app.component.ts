import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pages: Array<{title: string, component: string, icon: string}>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Chat Suche', component: '/search', icon: 'search' },
      { title: 'Chats', component: '/chats', icon: 'chatbubbles' },
      { title: 'Account', component: '/login', icon: 'person' },
      { title: 'Tutorial und Hilfe', component: '/', icon: 'help' },
      { title: 'Über diese App', component: '/', icon: 'information-circle' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
