import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SettingsPage } from '../pages/settings/settings';
import { MyWorkoutsPage } from '../pages/my-workouts/my-workouts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SettingsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      
      // Verify if profile exists
      var temp = localStorage.getItem("firstname");
      if(temp != "undefined") this.rootPage = MyWorkoutsPage;

      statusBar.styleDefault();
      splashScreen.hide();

      storage.set('workoutMax', 1);
      storage.set("workout1", {
        id: 1,
        name: 'Workout Test'
      });

      storage.set('exerciceMax1', 1);
      storage.set("exercice1-1", {
        id: 1,
        name: 'Exercice Test'
      });
    });
  }

}
