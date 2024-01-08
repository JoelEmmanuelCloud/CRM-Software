import * as db from './db';

interface Customer {
  id?: string;
  customerName: string;
  customerContactNumber: string;
  customerAddress?: string;
  customerEmail: string;
  customerStatus?: string;
  customerGender?: string;
  searchBy?: string;
  search?: string;
}

export const customerController = {
  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from customer where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from customer';

    db.getResults(sql, (results) => callback(results));
  },

  insert: (customer: Customer, callback: (status: any) => void): void => {
    const sql = `insert into customer VALUES ('', '${customer.customerName}' , '${customer.customerContactNumber}' , '${customer.customerAddress}' , '${customer.customerEmail}' , '${customer.customerStatus}' , '${customer.customerGender}')`;

    db.execute(sql, (status) => {
      console.log(sql, status);
      callback(status);
    });
  },

  update: (customer: Customer, callback: (status: any) => void): void => {
    const sql = `update customer set customerName='${customer.customerName}' , customerContactNumber='${customer.customerContactNumber}' , customerAddress='${customer.customerAddress}' , customerEmail='${customer.customerEmail}' , customerStatus='${customer.customerStatus}' , customerGender='${customer.customerGender}' where id = '${customer.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM customer WHERE id = '${id}'`;
    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (customer: Customer, callback: (results: any[] | false) => void): void => {
    const sql = `SELECT * FROM customer WHERE ${customer.searchBy} LIKE '%${customer.search}%'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results);
      } else {
        callback(false);
      }
    });
  }
};
