import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextchatPage } from './textchat';

@NgModule({
  declarations: [
    TextchatPage,
  ],
  imports: [
    IonicPageModule.forChild(TextchatPage),
  ],
})
export class TextchatPageModule {}
