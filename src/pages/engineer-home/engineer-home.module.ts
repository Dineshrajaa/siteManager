import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngineerHomePage } from './engineer-home';

@NgModule({
  declarations: [
    EngineerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(EngineerHomePage),
  ],
})
export class EngineerHomePageModule {}
