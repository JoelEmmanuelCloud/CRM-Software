import * as db from './db';

export const userController = {
  validate: (user: { username: string; password: string }, callback: (isValid: boolean) => void) => {
    const sql = `select * from verifysubscriber where username='${user.username}' and password='${user.password}'`;
    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  getById: (id: string, callback: (result: any) => void) => {
    const sql = `select * from admin where id='${id}'`;
    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void) => {
    const sql = 'select * from admin';
    db.getResults(sql, (results: any[]) => {
      callback(results);
    });
  },

  insert: (user: { name: string; mobile: string; email: string; gender: string; address: string }, callback: (status: any) => void) => {
    const sql = `insert into admin VALUES ('', '${user.name}', '${user.mobile}', '${user.email}', '${user.gender}', '${user.address}')`;

    console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  update: (user: { id: string; name: string; mobile: string; email: string; gender: string; address: string }, callback: (status: any) => void) => {
    const sql = `update admin set Name='${user.name}', Mobile='${user.mobile}', Email='${user.email}', Gender='${user.gender}', Address='${user.address}' where id = '${user.id}'`;

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void) => {
    const sql = `DELETE FROM admin WHERE id = '${id}'`;
    console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  search: (user: { search: string }, callback: (result: any) => void) => {
    const sql = `SELECT username FROM adminuser WHERE username = '${user.search}'`;

    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },
};
