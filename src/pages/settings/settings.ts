import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  prenom: any;
  nom: any;
  courriel: any;
  age: any;
  poids: any;
  niveau: any;
  genre: any;
  pieds: any;
  pouces: any;
  objectifs: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.afficherProfile();
  }

  reinitProfile(): boolean {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("courriel");
    localStorage.removeItem("poids");
    localStorage.removeItem("age");
    localStorage.removeItem("niveau");
    localStorage.removeItem("genre");
    localStorage.removeItem("pieds");
    localStorage.removeItem("pouces");
    localStorage.removeItem("objectifs");
    return true;
  }

  addProfile(): boolean {
    localStorage.setItem("firstname", this.prenom);
    localStorage.setItem("lastname", this.nom);
    localStorage.setItem("courriel", this.verifierDefini(this.courriel));
    localStorage.setItem("poids", this.verifierDefini(this.poids));
    localStorage.setItem("age", this.verifierDefini(this.age));
    localStorage.setItem("niveau", this.niveau);
    localStorage.setItem("genre", this.genre);
    localStorage.setItem("pieds", this.pieds);
    localStorage.setItem("pouces", this.pouces);
    localStorage.setItem("objectifs", this.objectifs);
    return true;
  }

  afficherProfile(): boolean {
    this.prenom = localStorage.getItem("firstname");
    this.nom = localStorage.getItem("lastname");
    this.courriel = localStorage.getItem("courriel");
    this.poids = localStorage.getItem("poids");
    this.age = localStorage.getItem("age");
    this.niveau = localStorage.getItem("niveau");
    this.genre = localStorage.getItem("genre");
    this.pieds = localStorage.getItem("pieds");
    this.pouces = localStorage.getItem("pouces");
    this.objectifs = localStorage.getItem("objectifs");
    return true;
  }
 
  goPagePrincipale() {
    if (this.nom == null || this.nom == "undefined" || this.nom == "" || this.nom == "null" || this.prenom == null || this.prenom == "undefined" || this.prenom == "" || this.prenom == "null") {
      this.showAlert();
      return;
    }
      //.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
    let regexEmail = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$');
    if (this.courriel != "" && this.courriel != " " && this.courriel != null && this.courriel != "undefined") {
      if (regexEmail.test(this.courriel) == false) {
        this.showAlertMessage('Veuillez entrer un courriel valide.');
        return;
      }
    }
   
    if (this.age != "" && this.age != null && this.age != "undefined") {
      if (isNaN(this.age) || (this.age < 0 || this.age > 130)) {
        this.showAlertMessage('Veuillez entrer un âge valide (0 à 130).');
        return;
      }
    }
    if (this.poids != "" && this.poids != null && this.poids != "undefined") {
      if (isNaN(this.poids) || (this.poids < 1 || this.poids > 1500)) {
          this.showAlertMessage('Veuillez entrer un poids valide (1-1500). ');
        return;
      }
    }
    this.addProfile();
    this.navCtrl.push(MyWorkoutsPage);
    this.navCtrl.removeView(this.navCtrl.getActive());
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: 'Les champs nom et prénom sont requis.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertMessage(msg) {
    const alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  verifierDefini(pp): string {
    if (pp == null || pp == "undefined" || pp == "" || pp == "null") {
      return "";
    }
    else {
      return pp;
    }
  }

}
