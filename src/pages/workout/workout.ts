import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';
import { ExercicePage } from '../exercice/exercice';
import { SettingsPage } from '../settings/settings';

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
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');

    if(this.workoutId){
      this.workout = JSON.parse(localStorage.getItem('workout' + this.workoutId));
      
      if(this.workout){
        this.workoutName = this.workout.name;
        this.pageTitle = this.workoutName;
        this.exerciceMax = parseInt(localStorage.getItem('exerciceMax' + this.workoutId), 10);
        this.exerciceList = [];
        this.getExerciceList();
      }
    } else {
      var workoutMax: number = parseInt(localStorage.getItem('workoutMax'), 10);
      workoutMax++;
      this.workoutId = workoutMax;
      localStorage.setItem('workoutMax', workoutMax.toString());
      localStorage.setItem('exerciceMax' + this.workoutId, "0");
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(MyWorkoutsPage);
      this.navCtrl.removeView(this.navCtrl.getPrevious(this.navCtrl.getActive()));
      this.navCtrl.removeView(this.navCtrl.getActive());
    }
  }

  ionViewCanLeave() {
    this.saveWorkout();
  }

  private getExerciceList() {
    var temp: any;
    
    for(var i = 0; i <= this.exerciceMax; i++){
      temp = JSON.parse(localStorage.getItem("exercice" + this.workoutId + "-" + i));
      if (temp) this.exerciceList.push(temp);
    }
  }

  private viewExercicePage(exerciceId: number) {
    this.navCtrl.push(ExercicePage, { workoutId: this.workoutId, exerciceId: exerciceId });
  }

  private newExercicePage() {
    this.navCtrl.push(ExercicePage, { workoutId: this.workoutId });
  }

  private viewSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  private deleteExercice(exerciceId: number) {
    localStorage.removeItem("exercice" + this.workoutId + "-" + exerciceId)

    this.refresh();
  }

  private refresh() {
    this.navCtrl.push(this.navCtrl.getActive().component, { workoutId: this.workoutId });
    this.navCtrl.removeView(this.navCtrl.getActive());
  }

  private saveWorkout() {
    if(!this.workoutName) return;

    var data = JSON.stringify({
      id: this.workoutId, 
      name: this.workoutName});

    localStorage.setItem("workout" + this.workoutId, data);
  }

}
