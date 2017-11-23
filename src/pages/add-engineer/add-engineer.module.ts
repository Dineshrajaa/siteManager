import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEngineerPage } from './add-engineer';

@NgModule({
  declarations: [
    AddEngineerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEngineerPage),
  ],
})
export class AddEngineerPageModule {}
