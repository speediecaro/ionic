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
  private workoutName: string;
  private pageTitle: string = "Nouvel entrainement";
  private exerciceMax: number;
  private exerciceList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  async ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');

    if(this.workoutId){
      this.workout = await this.storage.get('workout' + this.workoutId);
      
      if(this.workout) {
        this.workoutName = this.workout.name;
        this.pageTitle = this.workoutName;
        this.exerciceMax = await this.storage.get('exerciceMax' + this.workoutId);
        await this.getExerciceList();
      }
    }
  }

  private async getExerciceList() {
    var temp: any;
    this.exerciceList = [];
    
    for(var i = 0; i <= this.exerciceMax; i++){
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

    // Reload page
    this.navCtrl.push(this.navCtrl.getActive().component, { workoutId: this.workoutId });
    this.navCtrl.removeView(this.navCtrl.getActive());
  }

}
