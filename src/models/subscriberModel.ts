import * as db from './db';

interface User {
  id?: string;
  username: string;
  password: string;
  type: string;
  cname: string;
  cemail: string;
  cmobile: string;
  caddress: string;
  cmname: string;
  search?: string;
}

export const subscriberController = {
  validate: (user: User, callback: (status: boolean) => void): void => {
    const sql = `select * from adminuser where username='${user.username}' and password='${user.password}'`;

    db.getResults(sql, (results) => {
      callback(results.length > 0);
    });
  },

  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from adminuser where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from subscriber';

    db.getResults(sql, (results) => callback(results));
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into subscriber VALUES ('', '${user.type}' , '${user.cname}' , '${user.cemail}' , '${user.cmobile}', '${user.caddress}', '${user.cmname}' )`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update adminuser set username='${user.username}' , password='${user.password}' , type='${user.type}' where id = '${user.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM adminuser WHERE id = '${id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (user: User, callback: (result: any) => void): void => {
    const sql = `SELECT Manager_Name FROM subscriber WHERE Manager_Name = '${user.search}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },
};
