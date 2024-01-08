import * as db from './db';

interface SupAdmin {
  id?: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
}

interface User {
  id: string;
  username: string;
  password: string;
  type: string;
  search: string;
}

export const adminUserController = {
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
    const sql = 'select * from supadmin';

    db.getResults(sql, (results) => callback(results));
  },

  insert: (supAdmin: SupAdmin, image: string, callback: (status: any) => void): void => {
    const sql = `insert into supadmin VALUES ('', '${supAdmin.name}' , '${supAdmin.mobile}' , '${supAdmin.email}', '${supAdmin.gender}' , '${supAdmin.address}', '${image}' )`;

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
    const sql = `SELECT username FROM adminuser WHERE username = '${user.search}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },
};
