import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { WorkoutPage } from '../workout/workout';

/**
 * Generated class for the ExercicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public navParams: NavParams,
    private storage: Storage) {
  }

  async ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');
    this.exerciceId = this.navParams.get('exerciceId');

    if(this.exerciceId){
      this.exercice = await this.storage.get("exercice" + this.workoutId + "-" + this.exerciceId);

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

  async ionViewCanLeave() {
    await this.saveExercice();
  }

  private async saveExercice() {
    console.log(this.exerciceName);
    console.log(this.workoutId);
    console.log(this.exerciceId);

    if(!this.exerciceName) return;

    if(!this.exerciceId){
      var exerciceMax: number = await this.storage.get('exerciceMax' + this.workoutId);
      exerciceMax++;
      this.exerciceId = exerciceMax;
      this.storage.set('exerciceMax' + this.workoutId + "-" + this.exerciceId, exerciceMax);

      console.log(this.exerciceId);
      console.log(exerciceMax);
    }

    await this.storage.set("exercice" + this.workoutId + "-" + this.exerciceId, { id: this.exerciceId, name: this.exerciceName })
      .then(() => {})
      .catch((e) => console.log(e));
  }

}
