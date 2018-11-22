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
      if(temp && temp != "undefined" && temp != "" && temp != "null")
        this.rootPage = MyWorkoutsPage;

      // Verify workout max
      var workoutMax = localStorage.getItem('workoutMax');
      if(!workoutMax || workoutMax == "undefined" || workoutMax == "" || workoutMax == "null")
        localStorage.setItem('workoutMax', "0");

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
