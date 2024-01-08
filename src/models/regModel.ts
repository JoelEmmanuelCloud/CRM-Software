import * as db from './db';

interface User {
  id?: string;
  type: string;
  cname: string;
  cemail: string;
  cmobile: string;
  cemployee: string;
  caddress: string;
  cmname: string;
  username: string;
  password: string;
  search?: string;
}

export const adminUserController = {
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
    const sql = `select * from verifysubscriber where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from verifysubscriber';

    db.getResults(sql, (results) => callback(results));
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into verifiysubscriber VALUES ('', '${user.type}' , '${user.cname}' , '${user.cemail}' , '${user.cmobile}', '${user.cemployee}' , '${user.caddress}', '${user.cmname}'  )`;

    db.execute(sql, (status) => {
      // console.log(sql);

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
    // console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (user: User, callback: (result: any | false) => void): void => {
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
