import * as db from './db';

interface User {
  username: string;
  password: string;
  id?: string;
  type?: string;
  cname?: string;
  cemail?: string;
  cmobile?: string;
  caddress?: string;
  cmname?: string;
  isSolved?: string;
}

export const feedbackController = {
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
    const sql = `select * from feedback where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from feedback';

    db.getResults(sql, (results) => {
      return callback(results);
    });
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into subscriber VALUES ('', '${user.type}' , '${user.cname}' , '${user.cemail}' , '${user.cmobile}', '${user.caddress}', '${user.cmname}'  )`;

    db.execute(sql, (status) => {
      // console.log(sql);

      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update feedback set isSolved='${user.isSolved}'  where id = '${user.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM feedback WHERE id = '${id}'`;
    // console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  }
};
