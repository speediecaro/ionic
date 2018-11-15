import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';

@Component({
  selector: 'page-principale',
  templateUrl: 'page-principale.html'
})
export class PagePrincipalePage {

  constructor(public navCtrl: NavController) {

  }
  /* pour envoyer vers la page my workout */ 
  myWorkoutsPages(){
   this.navCtrl.push(MyWorkoutsPage)
  }
}
