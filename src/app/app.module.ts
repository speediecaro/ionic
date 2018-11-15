
import { MyWorkoutsPage } from './../pages/my-workouts/my-workouts';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilPage } from '../pages/profil/profil';
import { PagePrincipalePage } from '../pages/page-principale/page-principale';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsPage } from '../pages/settings/settings';
import { WorkoutPage } from '../pages/workout/workout';
import { ExercicePage } from '../pages/exercice/exercice';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PagePrincipalePage,
    SettingsPage,
    ProfilPage,
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PagePrincipalePage,
    ProfilPage,
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
