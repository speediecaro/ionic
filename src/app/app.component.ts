import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SettingsPage } from '../pages/settings/settings';
import { MyWorkoutsPage } from '../pages/my-workouts/my-workouts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SettingsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      // Verify if profile exists
      var temp = localStorage.getItem("firstname");
      if(temp != "undefined") this.rootPage = MyWorkoutsPage;

      statusBar.styleDefault();
      splashScreen.hide();

      localStorage.setItem('workoutMax', "1");
      localStorage.setItem("workout1", JSON.stringify({ id: 1, name: 'Workout Test' }));

      localStorage.setItem('exerciceMax1', "1");
      localStorage.setItem("exercice1-1", JSON.stringify({ id: 1, name: 'Exercice Test' }));
    });
  }

}
