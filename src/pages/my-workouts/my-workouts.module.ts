import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWorkoutsPage } from './my-workouts';


@NgModule({
  declarations: [
    MyWorkoutsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWorkoutsPage),
  ],
})
export class MyWorkoutsPageModule {}
