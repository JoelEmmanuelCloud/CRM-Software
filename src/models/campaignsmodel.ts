import * as db from './db';

interface User {
  username: string;
  password: string;
}

interface EventInfo {
  id: string;
  searchBy?: string;
  search?: string;
}

export const eventInfoController = {
  validate: (user: User, callback: (isValid: boolean, results: any[]) => void): void => {
    const sql = `select * from user where username='${user.username}' and password='${user.password}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(true, results);
      } else {
        callback(false, results);
      }
    });
  },

  getById: (id: string, callback: (results: any[]) => void): void => {
    const sql = `select * from eventinfo where id='${id}'`;

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from eventinfo';

    db.getResults(sql, (results) => {
      console.log(results);
      callback(results);
    });
  },

  search: (campaign: EventInfo, callback: (results: any[] | false) => void): void => {
    const sql = `SELECT * FROM eventinfo WHERE ${campaign.searchBy} LIKE '%${campaign.search}%'`;
    console.log('oo');

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results);
      } else {
        callback(false);
      }
    });
  }
};
