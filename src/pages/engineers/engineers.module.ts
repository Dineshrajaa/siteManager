import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngineersPage } from './engineers';

@NgModule({
  declarations: [
    EngineersPage,
  ],
  imports: [
    IonicPageModule.forChild(EngineersPage),
  ],
})
export class EngineersPageModule {}
