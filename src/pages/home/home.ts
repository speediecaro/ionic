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
  //public toast: ToastController;

  static get parameters() {
    return [[NavController]];
  }

  public goPagePrincipale() {
    
    if (this.isLoggedIn() == true) {
      alert("Bonjour " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));
    } else {
      alert("Bienvenue" + this.prenom + " " + this.nom + "!");
      localStorage.setItem("firstname", this.prenom);
      localStorage.setItem("lastname", this.nom);
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
    if (localStorage.getItem("firstname") != undefined && localStorage.getItem("lastname") != undefined) {
      return true;
    } else {
      return false;
    }
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
