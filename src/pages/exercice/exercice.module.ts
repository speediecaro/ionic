import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercicePage } from './exercice';

@NgModule({
  declarations: [
    ExercicePage,
  ],
  imports: [
    IonicPageModule.forChild(ExercicePage),
  ],
})
export class ExercicePageModule {}
