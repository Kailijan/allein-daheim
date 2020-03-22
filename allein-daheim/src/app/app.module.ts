import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiTopicMatchingProvider } from '../providers/api-topic-matching/api-topic-matching';
import { TextchatPage } from '../pages/textchat/textchat';
import { ApiUsersProvider } from '../providers/api-users/api-users';
import { ChatStorageProvider } from '../providers/chat-storage/chat-storage';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { MatchingPage } from '../pages/matching/matching';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TextchatPage,
    ChatListPage,
    MatchingPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TextchatPage,
    ChatListPage,
    MatchingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiTopicMatchingProvider,
    ApiUsersProvider,
    ChatStorageProvider
  ]
})
export class AppModule {}
