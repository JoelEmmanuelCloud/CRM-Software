import * as db from './db';

interface Salary {
  id?: string;
  employeeId: string;
  salaryGrade: string;
  salaryMin: string;
  salaryMax: string;
  searchBy?: string;
  search?: string;
}

export const salaryController = {
  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from salary where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from salary';

    db.getResults(sql, (results) => {
      return callback(results);
    });
  },

  update: (salary: Salary, callback: (status: any) => void): void => {
    const sql = `update salary set employeeId='${salary.employeeId}' , salaryGrade='${salary.salaryGrade}' , salaryMin='${salary.salaryMin}', salaryMax='${salary.salaryMax}' where id = '${salary.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (salary: Salary, callback: (results: any[] | false) => void): void => {
    const sql = `SELECT * FROM salary WHERE ${salary.searchBy} LIKE '%${salary.search}%'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results);
      } else {
        callback(false);
      }
    });
  }
};
