import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { WorkoutPage } from '../workout/workout';

/**
 * Generated class for the WorkoutListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout-list',
  templateUrl: 'workout-list.html',
})
export class WorkoutListPage {
  private workouts: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider) {}

  async ionViewWillEnter() {
    this.workouts = await this.database.getWorkouts();
  }

  public workoutSelected(workoutId: number) {
    this.navCtrl.push(WorkoutPage, { workoutId: workoutId });
  }

}
