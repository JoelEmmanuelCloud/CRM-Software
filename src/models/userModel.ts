import * as db from './db';

interface User {
  id: string;
  username: string;
  password: string;
  type: string;
  phone: string;
  email: string;
  designation: string;
}

export const userController = {
  validate: (user: User, callback: (isValid: boolean, results: any[]) => void): void => {
    const sql = `select * from user where username='${user.username}' and password='${user.password}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(true, results);
      } else {
        callback(false, []);
      }
    });
  },

  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from user where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from user';

    db.getResults(sql, (results) => {
      return callback(results);
    });
  },

  insert: (user: User, callback: (status: any) => void): void => {
    const sql = `insert into user VALUES ('', '${user.username}' , '${user.password}' , '${user.type}','','','','')`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (user: User, callback: (status: any) => void): void => {
    const sql = `update user set username='${user.username}' , contactNumber='${user.phone}' , email='${user.email}' , designation='${user.designation}' where id = '${user.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM user WHERE id = '${id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },
};
