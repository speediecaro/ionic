import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkoutPage } from '../workout/workout';
import { SettingsPage } from '../settings/settings';


@IonicPage()
@Component({
  selector: 'page-my-workouts',
  templateUrl: 'my-workouts.html',
})
export class MyWorkoutsPage {
  workoutList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.workoutList = [];
    this.getWorkoutList();
  }

  private getWorkoutList() {
    var temp: any;
    var max: number = parseInt(localStorage.getItem('workoutMax'), 10);
    
    for(var i = 0; i <= max; i++){
      temp = JSON.parse(localStorage.getItem("workout" + i));
      if (temp) this.workoutList.push(temp);
    }
  }

  private viewWorkoutPage(workoutId: number) {
    this.navCtrl.push(WorkoutPage, { workoutId: workoutId });
  }

  private newWorkoutPage() {
    this.navCtrl.push(WorkoutPage);
  }

  private viewSettingsPage() {
    console.log("viewSettingsPage");
    this.navCtrl.push(SettingsPage);
  }

  private deleteWorkout(workoutId: number) {
    localStorage.removeItem("workout" + workoutId)

    // Reload page
    this.navCtrl.push(this.navCtrl.getActive().component);
    this.navCtrl.removeView(this.navCtrl.getActive());
  }
}


