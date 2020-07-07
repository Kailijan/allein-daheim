import { NgModule } from '@angular/core';
import { ChatListPage } from './chat-list';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatListPage }])
  ],
  declarations: [
    ChatListPage,
  ]
})
export class ChatListPageModule {}
