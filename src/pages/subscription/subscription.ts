import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  prenom: string;
  nom: string;
  courriel: string;
  option: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  continue(){
    this.navCtrl.push(MyWorkoutsPage);
    this.navCtrl.removeView(this.navCtrl.getActive());
  }

  subscribe(){
    if(!this.validation()) return;
    this.save();

    this.navCtrl.push(SettingsPage);
  }

  save(){
    localStorage.setItem("firstname", this.prenom);
    localStorage.setItem("lastname", this.nom);
    localStorage.setItem("courriel", this.courriel);
  }

  validation(): boolean {
    if (this.nom == null || this.nom == "undefined" || this.nom == "" || this.nom == "null" || this.prenom == null || this.prenom == "undefined" || this.prenom == "" || this.prenom == "null") {
      this.showAlertMessage('Les champs nom et prénom sont requis.');
      return false;
    }
    //.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
    let regexEmail = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$');
    if (this.courriel == "" || this.courriel == " " || this.courriel == null || this.courriel == "undefined") {
      if (regexEmail.test(this.courriel) == false) {
        this.showAlertMessage('Veuillez entrer un courriel valide.');
        return false;
      }
    }
    if (this.option == null || this.option == "undefined" || this.option == "" || this.option == "null") {
      this.showAlertMessage('Veuillez choisir une option de paiement.');
      return false;
    }
    return true;
  }

  showAlertMessage(msg: string) {
    const alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
