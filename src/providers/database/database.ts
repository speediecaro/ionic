import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private storage: SQLiteObject;
  private options: any = {
    name: 'data.db',
    location: 'default'
  }
  private sqlCreate = `CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, title VARCHAR(50))`;

  constructor(private sqlite: SQLite) {
    this.connect();
  }
   
  private async connect() {
    await this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.storage = db;

        db.executeSql(this.sqlCreate, [])
          .then((res) => console.log(res))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  public async getWorkouts(): Promise<any[]> {
    var sql = "SELECT * FROM workouts";
    var results: any[] = [];

    await this.storage.executeSql(sql)
      .then((res) => {
        results = res.rows;
      })
      .catch(e => console.log(e));

    return results;
  }

  public getWorkout(workoutId: number): any {
    var sql = "SELECT * FROM workouts WHERE id = ?";

  //   this.storage.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }

  public getWorkoutExercices(workoutId: number): any[] {
    var sql = "SELECT * FROM exercices WHERE workout_id = ?";

  //   this.storage.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }

  public getExercice(exerciceId: number): any {
    var sql = "SELECT * FROM exercices WHERE id = ?";

  //   this.storage.executeSql(sql)
  //       .then(() => {})
  //       .catch(e => console.log(e));
    return;
  }
}
