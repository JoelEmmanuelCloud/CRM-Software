import * as db from './db';

interface User {
  id?: string;
  username: string;
  password: string;
  type?: string;
}

export const userController = {
  validate: (user: User, callback: (result: any) => void): void => {
    const sql = `select * from adminuser where username='${user.username}' and password='${user.password}'`;
    console.log(sql);

    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },

  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from adminuser where id='${id}'`;

    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from adminuser';

    db.getResults(sql, (results: any[]) => {
      callback(results);
    });
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into adminuser VALUES ('', '${user.username}' , '${user.password}' , '${user.type}')`;

    // console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update adminuser set username='${user.username}' , password='${user.password}' , type='${user.type}' where id = '${user.id}'`;

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM adminuser WHERE id = '${id}'`;
    console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },
};
