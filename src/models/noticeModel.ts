import * as db from './db';

interface User {
  username: string;
  password: string;
  id?: string;
  title?: string;
  details?: string;
  concerned_to?: string;
  date?: string;
  name?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  address?: string;
  search?: string;
}

export const adminController = {
  validate: (user: User, callback: (isValid: boolean) => void): void => {
    const sql = `select * from verifysubscriber where username='${user.username}' and password='${user.password}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from admin where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from adminnotice';

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  getMeeting: (callback: (results: any[]) => void): void => {
    const sql = "select * from adminnotice where title='Meeting'";

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into adminnotice VALUES ('',  '${user.title}' , '${user.details}' , '${user.concerned_to}', '${user.date}' )`;

    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update admin set Name='${user.name}' , Mobile='${user.mobile}' , Email='${user.email}',Gender='${user.gender}' ,Address='${user.address}'  where id = '${user.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM admin WHERE id = '${id}'`;
    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (user: User, callback: (result: any) => void): void => {
    const sql = `SELECT username FROM adminuser WHERE username = '${user.search}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  }
};
