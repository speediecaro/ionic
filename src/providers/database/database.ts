import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  options: any = {
    name: 'data.db',
    location: 'default'
  }

  constructor(private sqlite: SQLite) {
    this.connect();
  }
    
  private connect(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;

        var sql = `
          CREATE TABLE IF NOT EXISTS 'workouts' (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50));
          CREATE TABLE IF NOT EXISTS 'exercices' (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50), workout_id INTEGER);`;

        db.executeSql(sql, {})
          .then(() => {})
          .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }

  public getWorkouts(): any[] {
    var sql = "SELECT * FROM workouts";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }

  public getWorkout(workoutId: number): any {
    var sql = "SELECT * FROM workouts WHERE id = ?";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }

  public getWorkoutExercices(workoutId: number): any[] {
    var sql = "SELECT * FROM exercices WHERE workout_id = ?";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }

  public getExercice(exerciceId: number): any {
    var sql = "SELECT * FROM exercices WHERE id = ?";

  //   this.db.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }
}
