import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WorkoutPage } from '../workout/workout';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the MyWorkoutsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-workouts',
  templateUrl: 'my-workouts.html',
})
export class MyWorkoutsPage {
  workoutList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  async ionViewWillEnter() {
    this.workoutList = [];
    await this.getWorkoutList();
  }

  private async getWorkoutList() {
    var temp: any;
    var max: number = await this.storage.get('workoutMax');
    
    for(var i = 0; i <= max; i++){
      temp = await this.storage.get("workout" + i);
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
    this.storage.remove("workout" + workoutId)
      .then(() => console.log("Deleted workout " + workoutId))
      .catch((e) => console.log(e));

    // Reload page
    this.navCtrl.push(this.navCtrl.getActive().component);
    this.navCtrl.removeView(this.navCtrl.getActive());
  }
}


