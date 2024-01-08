import * as db from './db';

interface SupAdmin {
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
  cname: string;
  fee: string;
  date: string;
  search: string;
}

export const subscriberController = {
  validate: (user: User, callback: (isValid: boolean) => void): void => {
    const sql = `select * from adminuser where username='${user.username}' and password='${user.password}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from verifiysubscriber where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from verifiysubscriber';

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  insert: (supAdmin: SupAdmin, callback: (status: any) => void): void => {
    const sql = `insert into supadmin VALUES ('', '${supAdmin.name}' , '${supAdmin.mobile}' , '${supAdmin.email}', '${supAdmin.gender}' , '${supAdmin.address}' )`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  insertreport: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into report VALUES ('', '${user.cname}' , '${user.fee}' , '${user.date}' )`;

    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update user set username='${user.username}' , password='${user.password}' , type='${user.type}' where id = '${user.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM verifiysubscriber WHERE id = '${id}'`;

    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (user: User, callback: (result: any) => void): void => {
    const sql = `SELECT username FROM verifiysubscriber WHERE username = '${user.search}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },
};
