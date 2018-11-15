import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
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
      //alert("Bonjour " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));
      this.modifierProfile();
      this.addProfile();
    } else {
      //alert("Bienvenue " + this.prenom + " " + this.nom + " ! + Objectifs : " + this.objectifs);
      this.addProfile();
    }
    this.nav.push(HomePage);
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
   // this.reinitProfile();
    if (localStorage.getItem("firstname") != undefined && localStorage.getItem("lastname") != undefined) {
      return true;
    } else {
      return false;
    }
  }

  // Permet de modifier le html avec ce qui est storé
  modifierProfile(): boolean{
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
  // Permet d'enlever ce qui a été mis dans le locas storage, pour tests seulement
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

  //Permet d'ajouter dans le storage local le profil de l'utilisateur
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
}
