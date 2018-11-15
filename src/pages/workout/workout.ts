import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  private workoutName: string = "Nouvel entrainement";
  private exerciceList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  async ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');
    console.log(this.workoutId);
    if(this.workoutId){
      this.workout = await this.storage.get('workout' + this.workoutId);
      this.workoutName = this.workout.name;
      await this.getExerciceList();
    }
  }

  private async getExerciceList() {
    var temp: any;
    var max: number = await this.storage.get('exerciceMax' + this.workoutId);
    this.exerciceList = [];
    
    for(var i = 0; i <= max; i++){
      temp = await this.storage.get("exercice" + this.workoutId + "-" + i);
      if (temp) this.exerciceList.push(temp);
    }
  }

  private viewExercicePage(exerciceId: number) {
    // this.navCtrl.push(ExercicePage, { workoutId: workoutId, exerciceId: exerciceId });
  }

  private newExercicePage() {
    // this.navCtrl.push(ExercicePage, { workoutId: workoutId });
  }

  private deleteExercice(exerciceId: number) {
    this.storage.remove("exercice" + this.workoutId + "-" + exerciceId)
      .then(() => console.log("Deleted exercice " + this.workoutId + "-" + exerciceId))
      .catch((e) => console.log(e));

    this.navCtrl.setRoot(this.navCtrl.getActive().component); // reload page
  }

}
