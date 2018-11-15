import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';
import { ExercicePage } from '../exercice/exercice';

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
  @ViewChild(Navbar) navBar: Navbar;
  private pageTitle: string = "Nouvel entrainement";
  private workoutId: number;
  private workout: any;
  private workoutName: string;
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
      
      if(this.workout){
        this.workoutName = this.workout.name;
        this.pageTitle = this.workoutName;
        this.exerciceMax = await this.storage.get('exerciceMax' + this.workoutId);
        this.exerciceList = [];
        await this.getExerciceList();
      }
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(MyWorkoutsPage);
      this.navCtrl.removeView(this.navCtrl.getPrevious(this.navCtrl.getActive()));
      this.navCtrl.removeView(this.navCtrl.getActive());
    }
  }

  async ionViewCanLeave() {
    await this.saveWorkout();
  }

  private async getExerciceList() {
    var temp: any;
    
    for(var i = 0; i <= this.exerciceMax; i++){
      temp = await this.storage.get("exercice" + this.workoutId + "-" + i);
      if (temp) this.exerciceList.push(temp);
    }
  }

  private viewExercicePage(exerciceId: number) {
    this.navCtrl.push(ExercicePage, { workoutId: this.workoutId, exerciceId: exerciceId });
  }

  private newExercicePage() {
    this.navCtrl.push(ExercicePage, { workoutId: this.workoutId });
  }

  private deleteExercice(exerciceId: number) {
    this.storage.remove("exercice" + this.workoutId + "-" + exerciceId)
      .then(() => console.log("Deleted exercice " + this.workoutId + "-" + exerciceId))
      .catch((e) => console.log(e));

    this.refresh();
  }

  private refresh() {
    this.navCtrl.push(this.navCtrl.getActive().component, { workoutId: this.workoutId });
    this.navCtrl.removeView(this.navCtrl.getActive());
  }

  private async saveWorkout() {
    if(!this.workoutName) return;

    if(!this.workoutId) {
      var workoutMax: number = await this.storage.get('workoutMax');
      workoutMax++;
      this.workoutId = workoutMax;
      this.storage.set('workoutMax', workoutMax);
      this.storage.set('exerciceMax' + this.workoutId, 0);
    }

    await this.storage.set("workout" + this.workoutId, { id: this.workoutId, name: this.workoutName });
  }

}
