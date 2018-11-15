import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MyWorkoutsPage } from '../my-workouts/my-workouts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyWorkoutsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
