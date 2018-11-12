import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the WorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage {
  private workoutId: number;
  private workout: any;
  private exercices: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider) {
      this.workoutId = navParams.get('workoutId');
  }

  async ionViewWillEnter() {
    this.workout = await this.database.getWorkout(this.workoutId);
    this.exercices = await this.database.getWorkoutExercices(this.workoutId);
  }

  public exerciceSelected(exerciceId: number) {
    // this.navCtrl.push(ExercicePage, { exerciceId: exerciceId });
  }

}
