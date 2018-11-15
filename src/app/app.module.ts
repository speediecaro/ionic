
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsPage } from '../pages/settings/settings';
import { MyWorkoutsPage } from './../pages/my-workouts/my-workouts';
import { WorkoutPage } from '../pages/workout/workout';
import { ExercicePage } from '../pages/exercice/exercice';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    MyWorkoutsPage,
    WorkoutPage,
    ExercicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    MyWorkoutsPage,
    WorkoutPage,
    ExercicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
