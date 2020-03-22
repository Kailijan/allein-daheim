import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchingPage } from './matching';

@NgModule({
  declarations: [
    MatchingPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchingPage),
  ],
})
export class MatchingPageModule {}
