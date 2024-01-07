import * as db from './db';

interface BankInfo {
  id?: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  searchBy?: string;
  search?: string;
}

export const bankInfoController = {
  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from bankinfo where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from bankinfo';

    db.getResults(sql, (results) => callback(results));
  },

  update: (bankInfo: BankInfo, callback: (status: any) => void): void => {
    const sql = `update bankinfo set accountName='${bankInfo.accountName}' , accountNumber='${bankInfo.accountNumber}' , bankName='${bankInfo.bankName}' where id = '${bankInfo.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (bankInfo: BankInfo, callback: (results: any[] | false) => void): void => {
    const sql = `SELECT * FROM bankinfo WHERE ${bankInfo.searchBy} LIKE '%${bankInfo.search}%'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results);
      } else {
        callback(false);
      }
    });
  },
};
