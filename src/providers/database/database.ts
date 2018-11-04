import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connect();
  }
    
  private connect(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;

        // var sql = "CREATE TABLE IF NOT EXISTS `` ()";

        // db.executeSql(sql, {})
        //   .then(() => console.log('Executed SQL'))
        //   .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }

  // public getWorkouts(): any[] {
  //   var sql = "";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
  // }

  // public getWorkout(id: number): any {
  //   var sql = "";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
  // }

  // public getExercice(id: number): any {
  //   var sql = "";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
  // }
}
