import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PagePrincipalePage } from '../page-principale/page-principale';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  nav: NavController;
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

  //public toast: ToastController;

  static get parameters() {
    return [[NavController]];
  }

  public goPagePrincipale() {

    if (this.isLoggedIn() == true) {
      alert("Bonjour " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));
    } else {
      alert("Bienvenue " + this.prenom + " " + this.nom + " ! + Objectifs : " + this.objectifs);
      this.addProfile();
    }
    this.nav.push(PagePrincipalePage);
  }

  constructor(nav: NavController, public alertCtrl: AlertController) {
    this.nav = nav;

    if (typeof (Storage) != "undefined") {

      if (this.isLoggedIn() == true) {
        this.goPagePrincipale();
      }
      else {
        alert("Veuillez entrer votre profil.");
      }
    } else {
        alert("Désolé, ne supporte pas le Storage..");
    }
  }

  isLoggedIn(): boolean {
    // Pour déboguer, enlever cette ligne reinitProfile, on peut refaire la réinitialisation du profile
    this.reinitProfile();
    if (localStorage.getItem("firstname") != undefined && localStorage.getItem("lastname") != undefined) {
      return true;
    } else {
      return false;
    }
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
    localStorage.setItem("courriel", this.courriel);
    localStorage.setItem("poids", this.poids);
    localStorage.setItem("age", this.age);
    localStorage.setItem("niveau", this.niveau);
    localStorage.setItem("genre", this.genre);
    localStorage.setItem("pieds", this.pieds);
    localStorage.setItem("pouces", this.pouces);
    localStorage.setItem("objectifs", this.objectifs);
    return true;
  }

 showAlert() {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }
}
