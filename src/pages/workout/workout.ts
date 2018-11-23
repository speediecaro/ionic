import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
  public shouldShowReorder: any = true;

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
        //test voir
        this.shouldShowReorder = "true";
        localStorage.setItem("shouldShowReorder", "true");
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

  reorderItems(indexes) {
    this.exerciceList.splice(indexes.to, 0, this.exerciceList.splice(indexes.from, 1)[0]);
    this.reorderExerciceList(indexes);
  }

 
  // Permet de réordonner les 2 exercices réordonnés dans le contenu du storage aussi
  private reorderExerciceList(indexes) {
    // Aller chercher le json pour un exercice
    var fromId = localStorage.getItem("exercice" + this.workoutId + "-" + this.exerciceList[indexes.from].id);
    var toId = localStorage.getItem("exercice" + this.workoutId + "-" + this.exerciceList[indexes.to].id);

    // Garder toutes les variables en mémoire temporairement pour interchanger les valeurs seulement
    //{"id":2,"name":"Dumbbell","image":"fly.jpg","category":"Chest","sets":4,"reps":20,"weight":"100"}
    var dataTo = JSON.parse(toId);
    var dataFrom = JSON.parse(fromId);

    //let tempTo:number = dataTo["id"];
    const tname = dataTo["name"];
    const timage = dataTo["image"];
    const tcategory= dataTo["category"];
    const tsets= dataTo["sets"];
    const treps= dataTo["reps"];
    let tweight: any = dataTo["weight"];
    
    let fname = dataFrom["name"];
    let fimage= dataFrom["image"];
    let fcategory= dataFrom["category"];
    let fsets= dataFrom["sets"];
    let freps= dataFrom["reps"];
    let fweight: any = dataFrom["weight"];

    dataFrom["name"] = tname;
    dataFrom["image"] = timage;
    dataFrom["category"] = tcategory;
    dataFrom["sets"] = tsets;
    dataFrom["reps"] = treps;
    // Ici il faut faire attention pour l'échange, car s'il y en a un qui a un poids et pas l'autre
    if (tweight && fweight) {
      dataFrom["weight"] = tweight;
      dataTo["weight"] = fweight;
    }
    else if (fweight && !tweight) {
      dataTo["weight"] = fweight;
      delete dataFrom["weight"];
    }
    else if (!fweight && tweight) {
      dataFrom["weight"] = tweight;
      delete dataTo["weight"];
    }

    dataTo["name"] = fname;
    dataTo["image"] = fimage;
    dataTo["category"] = fcategory;
    dataTo["sets"] = fsets;
    dataTo["reps"] = freps;

    localStorage.setItem("exercice" + this.workoutId + "-" + this.exerciceList[indexes.from].id, JSON.stringify(dataFrom));
    localStorage.setItem("exercice" + this.workoutId + "-" + this.exerciceList[indexes.to].id, JSON.stringify(dataTo));
    
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
    //Ici, vu que ça reset la vue et qu'on remet le reorder à true par défaut, on doit le dire aux variables.
    this.shouldShowReorder = "true";
    localStorage.setItem("shouldShowReorder", "true");
  }

  private saveWorkout() {
    if(!this.workoutName) return;

    var data = JSON.stringify({
      id: this.workoutId, 
      name: this.workoutName});

    localStorage.setItem("workout" + this.workoutId, data);
  }

  afficherOrdre(event) {
    if (localStorage.getItem("shouldShowReorder") == "true") {
      localStorage.setItem("shouldShowReorder", "false");
      this.shouldShowReorder = "false";
    }
    else {
      localStorage.setItem("shouldShowReorder", "true");
      this.shouldShowReorder = "true";
    }
  }
}
