import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { WorkoutPage } from '../workout/workout';
import { SettingsPage } from '../settings/settings';


@IonicPage()
@Component({
  selector: 'page-exercice',
  templateUrl: 'exercice.html',
})
export class ExercicePage {
  @ViewChild(Navbar) navBar: Navbar;
  private pageTitle: string = "Nouvel exercice";
  private workoutId: number;
  private exerciceId: number;
  private exercice: any;
  private exerciceName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');
    this.exerciceId = this.navParams.get('exerciceId');

    if(this.exerciceId){
      this.exercice = JSON.parse(localStorage.getItem("exercice" + this.workoutId + "-" + this.exerciceId));

      console.log(this.exercice);

      if(this.exercice){
        this.exerciceName = this.exercice.name;
        this.pageTitle = this.exerciceName;
      }
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(WorkoutPage, { workoutId: this.workoutId });
      this.navCtrl.removeView(this.navCtrl.getPrevious(this.navCtrl.getActive()));
      this.navCtrl.removeView(this.navCtrl.getActive());
    }
  }

  ionViewCanLeave() {
    this.saveExercice();
  }

  private saveExercice() {
    if(!this.exerciceName) return;

    if(!this.exerciceId){
      var exerciceMax: number = parseInt(localStorage.getItem('exerciceMax' + this.workoutId), 10);
      exerciceMax++;
      this.exerciceId = exerciceMax;
      localStorage.setItem('exerciceMax' + this.workoutId, exerciceMax.toString());
    }

    localStorage.setItem(
      "exercice" + this.workoutId + "-" + this.exerciceId, 
      JSON.stringify({ id: this.exerciceId, name: this.exerciceName })
    );
  }

  private viewSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

}
