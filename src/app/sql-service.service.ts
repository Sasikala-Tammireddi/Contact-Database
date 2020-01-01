import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqlServiceService {
  databaseObj: SQLiteObject;
  databasename = 'contact.db';
  tablename = 'contacts';

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform
      .ready()
      .then(() => {
        this.createDB();
      })
      .catch(error => {
        console.log(error);
      });
  }
  createDB() {
    this.sqlite
      .create({
        name: this.databasename,
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        console.log('Database created Successfully');
        this.createTable();
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  }

  createTable() {
    return new Promise((resolve, reject) => {
      const sql =
        'CREATE TABLE IF NOT EXISTS ' +
        this.tablename +
        ' (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,mobile NUMBER,date TEXT,title varchar(255), description varchar(255))';
      this.databaseObj.executeSql(sql, []).then(
        data => {
          resolve(data);
          console.log('Table created Successfully');
        },
        error => {
          reject(error);
        }
      );
    });
  }

  addContact(addContactFormValue) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO contacts (mobile, date, title, description) VALUES (?, ?, ?, ?)';
      this.databaseObj
        .executeSql(sql, [
          addContactFormValue.mobile,
          addContactFormValue.date,
          addContactFormValue.title,
          addContactFormValue.description
        ])
        .then(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getContacts() {
    return new Promise((resolve, reject) => {
      this.databaseObj.executeSql('SELECT * FROM contacts', []).then(
        data => {
          const Contacts: Array<any> = [];
          for (let i = 0; i < data.rows.length; i++) {
            Contacts.push(data.rows.item(i));
          }
          resolve(Contacts);
        },
        error => {
          console.error('Error ::::\n', error);
          reject(error);
        }
      );
    });
  }
  updateContact(updateContactFormValue) {
    return new Promise((resolve, reject) => {
      const sqlToUpdate = `UPDATE contacts SET mobile=?, date=?, title=?, description=? WHERE id=?`;
      this.databaseObj
        .executeSql(sqlToUpdate, [
          updateContactFormValue.mobile,
          updateContactFormValue.date,
          updateContactFormValue.title,
          updateContactFormValue.description,
          updateContactFormValue.id
        ])
        .then(
          resp => {
            resolve(resp);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  deleteContact(contact) {
    return new Promise((resolve, reject) => {
      const sqlToDeleteCollection = `DELETE FROM contacts WHERE id=?`;
      this.databaseObj.executeSql(sqlToDeleteCollection, [contact]).then(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
