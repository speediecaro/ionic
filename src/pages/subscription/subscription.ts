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

  sendMail() {
    
    //Envoyer un courriel

    var data = JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": this.courriel,
              "name": this.prenom + " " + this.nom
            }
          ],
          "subject": "Confirmation d'abonnement"
        }
      ],
      "from": {
        "email": "speediecaro@gmail.com",
        "name": "Logiciel FitMe"
      },
      "reply_to": {
        "email": this.courriel,
        "name": "Logiciel FitMe"
      },
      "content": [
        {
          "type": "text/plain",
          "value": "Bonjour, l'abonnement pour l'utilisateur " + this.prenom + " " + this.nom + " (" + this.courriel + ") a choisi l'abonnement " + this.option
        }
      ]
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.sendgrid.com/v3/mail/send");
    xhr.setRequestHeader("authorization", "Bearer 6bagjbf-RCmVkhIjCZO-iw");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
    // alert("a été envoyé à " + this.courriel);
  }
}