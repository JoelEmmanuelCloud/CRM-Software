import * as db from './db';

export const statisticsController = {
  getCountProduct: (callback: (results: any) => void): void => {
    const sql = "SELECT COUNT(*) as count from product";
    console.log(sql);

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  getInventory: (callback: (results: any) => void): void => {
    const sql = "SELECT SUM(quantityInStock) as inventory from product";
    console.log(sql);

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  getCountCustomer: (callback: (results: any) => void): void => {
    const sql = "SELECT COUNT(*) as count from customer";
    console.log(sql);

    db.getResults(sql, (results) => {
      callback(results);
    });
  },
};
