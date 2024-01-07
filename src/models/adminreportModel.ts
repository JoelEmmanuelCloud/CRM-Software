import * as db from './db';

export const userController = {
  validate: (user: { username: string; password: string }, callback: (isValid: boolean) => void) => {
    const sql = `select * from adminuser where username='${user.username}' and password='${user.password}'`;
    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  getreportdata: (callback: (results: any[]) => void) => {
    const sql = "select year(date) as Year, month(date) as Month, sum(amount) as Income from report group by year(date), month(date)";
    console.log(sql);
    db.getResults(sql, (results: any[]) => {
      callback(results);
    });
  },

  getAll: (callback: (results: any[]) => void) => {
    const sql = "select * from verifiysubscriber";
    db.getResults(sql, (results: any[]) => {
      callback(results);
    });
  },

  insert: (supAdmin: { name: string; mobile: string; email: string; gender: string; address: string }, callback: (status: any) => void) => {
    const sql = `insert into supadmin VALUES ('', '${supAdmin.name}' , '${supAdmin.mobile}' , '${supAdmin.email}', '${supAdmin.gender}' , '${supAdmin.address}' )`;

    // console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  insertreport: (user: { cname: string; fee: number; date: string }, callback: (status: any) => void) => {
    const sql = `insert into report VALUES ('', '${user.cname}' , '${user.fee}' , '${user.date}' )`;

    console.log(sql);

    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  update: (user: { username: string; password: string; type: string; id: string }, callback: (status: any) => void) => {
    const sql = `update user set username='${user.username}' , password='${user.password}' , type='${user.type}' where id = '${user.id}'`;
    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void) => {
    const sql = `DELETE FROM verifiysubscriber WHERE id = '${id}'`;
    console.log(sql);
    db.execute(sql, (status: any) => {
      callback(status);
    });
  },

  search: (user: { search: string }, callback: (result: any) => void) => {
    const sql = `SELECT username FROM verifiysubscriber WHERE username = '${user.search}'`;

    db.getResults(sql, (results: string | any[]) => {
      if (results.length > 0) {
        callback(results[0]);
      } else {
        callback(false);
      }
    });
  },
};
