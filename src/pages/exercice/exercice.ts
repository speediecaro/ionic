import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { WorkoutPage } from '../workout/workout';

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
  private image: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.workoutId = this.navParams.get('workoutId');
    this.exerciceId = this.navParams.get('exerciceId');

    if(this.exerciceId){
      this.exercice = JSON.parse(localStorage.getItem("exercice" + this.workoutId + "-" + this.exerciceId));

      if(this.exercice){
        this.exerciceName = this.exercice.name;
        this.pageTitle = this.exercice.name;
        this.selectExercice();
      }
    } else {
      var exerciceMax: number = parseInt(localStorage.getItem('exerciceMax' + this.workoutId), 10);
      exerciceMax++;
      this.exerciceId = exerciceMax;
      localStorage.setItem('exerciceMax' + this.workoutId, exerciceMax.toString());
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

    var data = JSON.stringify({
      id: this.exerciceId,
      name: this.exerciceName,
      image: this.image});

    localStorage.setItem("exercice" + this.workoutId + "-" + this.exerciceId, data);
  }

  private selectExercice() {
    var image: string = "";
    var i = 0;
    while(i < this.exerciceList.length && image.length == 0){
      if(this.exerciceList[i].name == this.exerciceName)
        this.image = this.exerciceList[i].image;
      i++;
    }
  }

  private categories: any[] = [
    {
      id: 1,
      name: "Biceps"
    },
    {
      id: 2,
      name: "Triceps"
    },
    {
      id: 3,
      name: "Chest"
    },
    {
      id: 4,
      name: "Shoulders"
    },
    {
      id: 5,
      name: "Legs"
    },
    {
      id: 6,
      name: "Abs"
    },
    {
      id: 7,
      name: "Back"
    }];

  private exerciceList: any[] = [
    {
      id: 1,
      name: "Barbell bicep curls",
      image: "../../assets/imgs/exercices/Barbell-Biceps-Curl-300x146.png",
      category: 1
    },
    {
      id: 2,
      name: "Hammer curls",
      image: "../../assets/imgs/exercices/Standing-Dumbbell-Hammer-Curls.png",
      category: 1
    },
    {
      id: 3,
      name: "Bicep cable curls",
      image: "../../assets/imgs/exercices/Standing+Biceps+Cable+Curl.png",
      category: 1},
    {
      id: 4,
      name: "Concentration curls",
      image: "../../assets/imgs/exercices/One+Arm+Concentration+Curls.jpg",
      category: 1},
    {
      id: 5,
      name: "EZ-Bar curls",
      image: "../../assets/imgs/exercices/Standing+EZ+Bar+Curls.jpg",
      category: 1
    },
    {
      id: 6,
      name: "Triceps pushdown",
      image: "../../assets/imgs/exercices/Triceps-Pushdown-2.png",
      category: 2
    },
    {
      id: 7,
      name: "Skullcruchers",
      image: "../../assets/imgs/exercices/skullcruchers.jpg",
      category: 2
    },
    {
      id: 8,
      name: "Close-grip barbell press",
      image: "../../assets/imgs/exercices/closegripppress.jpg",
      category: 2
    },
    {
      id: 9,
      name: "Dips",
      image: "../../assets/imgs/exercices/dips.jpg",
      category: 2
    },
    {
      id: 10,
      name: "Chair dips",
      image: "../../assets/imgs/exercices/tricep-bench-dips-490x218.jpg",
      category: 2
    },
    {
      id: 11,
      name: "Bench press",
      image: "../../assets/imgs/exercices/Flat+Barbell+Bench+Press.jpg",
      category: 3
    },
    {
      id: 12,
      name: "Dumbbell chest press",
      image: "../../assets/imgs/exercices/Flat+Dumbbell+Chest+Press.jpg",
      category: 3
    },
    {
      id: 13,
      name: "Cable chest fly",
      image: "../../assets/imgs/exercices/chrst fly.jpg",
      category: 3
    },
    {
      id: 14,
      name: "Chest pullover",
      image: "../../assets/imgs/exercices/Straight+Arm+Dumbbell+Pullover.png",
      category: 3
    },
    {
      id: 15,
      name: "Dumbbell incline fly",
      image: "../../assets/imgs/exercices/dumbbell incline fly.jpg",
      category: 3
    },
    {
      id: 16,
      name: "Military press",
      image: "../../assets/imgs/exercices/Seated-Military-Press-1024x629.jpg",
      category: 4
    },
    {
      id: 17,
      name: "Shoulder lateral raise",
      image: "../../assets/imgs/exercices/hsoulder lateral raise.jpg",
      category: 4
    },
    {
      id: 18,
      name: "Rear cable fly",
      image: "../../assets/imgs/exercices/Standing+Cable+Rear+Delt+Fly.jpg",
      category: 4
    },
    {
      id: 19,
      name: "Cable lateral raises",
      image: "../../assets/imgs/exercices/cable lateral raise.jpg",
      category: 4
    },
    {
      id: 20,
      name: "Inverted peck-deck",
      image: "../../assets/imgs/exercices/inverted peck deck.jpg",
      category: 4
    },
    {
      id: 21,
      name: "Squat",
      image: "../../assets/imgs/exercices/front squat.jpg",
      category: 5
    },
    {
      id: 22,
      name: "Front squat",
      image: "../../assets/imgs/exercices/front squat.jpg",
      category: 5
    },
    {
      id: 23,
      name: "Leg extension",
      image: "../../assets/imgs/exercices/leg-extension.jpg",
      category: 5
    },
    {
      id: 24,
      name: "Leg curl",
      image: "../../assets/imgs/exercices/leg curl.jpg",
      category: 5
    },
    {
      id: 25,
      name: "Weighted Lunges",
      image: "../../assets/imgs/exercices/dumbbell-lunges.png",
      category: 5
    },
    {
      id: 26,
      name: "Crunches",
      image: "../../assets/imgs/exercices/Crunches.jpg",
      category: 6
    },
    {
      id: 27,
      name: "Front leg raises",
      image: "../../assets/imgs/exercices/leg raise.png",
      category: 6
    },
    {
      id: 28,
      name: "Plank",
      image: "../../assets/imgs/exercices/Prone+Plank.png",
      category: 6
    },
    {
      id: 29,
      name: "Flutter kicks",
      image: "../../assets/imgs/exercices/Flutter+Kicks.png",
      category: 6
    },
    {
      id: 30,
      name: "Bicycle crunches",
      image: "../../assets/imgs/exercices/Air+Bike.png",
      category: 6
    },
    {
      id: 31,
      name: "Pullups",
      image: "../../assets/imgs/exercices/pulllups.jpg",
      category: 7
    },
    {
      id: 32,
      name: "Deadlift",
      image: "../../assets/imgs/exercices/deadlift.jpg",
      category: 7
    },
    {
      id: 33,
      name: "Bent over rows",
      image: "../../assets/imgs/exercices/Barbell+Underhand+Bent+Over+Row.png",
      category: 7
    },
    {
      id: 34,
      name: "Lats pulldowns",
      image: "../../assets/imgs/exercices/Overhand+Grip+Lat+Pulldown.jpg",
      category: 7
    },
    {
      id: 35,
      name: "Single arm dumbbell rows",
      image: "../../assets/imgs/exercices/One+Arm+Dumbbell+Row.jpg",
      category: 7
    }];

}
