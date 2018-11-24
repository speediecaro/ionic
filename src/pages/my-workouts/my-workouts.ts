import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkoutPage } from '../workout/workout';
import { SettingsPage } from '../settings/settings';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HelpPage } from '../help/help';

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
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
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

  // private help() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Créer un entrainement',
  //     subTitle: "Pour modifier votre profil, cliquez sur l'icone d'engrenage en haut à droite. Pour créer un entrainement, ",
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  private help() {
    const modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }
  
}