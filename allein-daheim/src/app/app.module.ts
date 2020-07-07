import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiTopicMatchingProvider } from '../providers/api-topic-matching/api-topic-matching';
import { TextchatPage } from '../pages/textchat/textchat';
import { ApiUsersProvider } from '../providers/api-users/api-users';
import { ChatStorageProvider } from '../providers/chat-storage/chat-storage';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { MatchingPage } from '../pages/matching/matching';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    TextchatPage,
    ChatListPage,
    MatchingPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    TextchatPage,
    ChatListPage,
    MatchingPage,
    SearchPage,
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
