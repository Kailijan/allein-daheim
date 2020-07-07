import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatchingPage } from './matching';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: MatchingPage }])
  ],
  declarations: [
    MatchingPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class MatchingPageModule {}
