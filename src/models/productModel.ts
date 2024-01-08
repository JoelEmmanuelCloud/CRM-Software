import * as db from './db';

interface Product {
  id?: string;
  productCode: string;
  productName: string;
  productVendor: string;
  quantityInStock: string;
  buyPrice: string;
  sellPrice: string;
  productDescription: string;
  productImage: string;
  searchBy?: string;
  search?: string;
}

export const productController = {
  getById: (id: string, callback: (result: any) => void): void => {
    const sql = `select * from product where id='${id}'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results[0]);
      }
    });
  },

  getAll: (callback: (results: any[]) => void): void => {
    const sql = 'select * from product';

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  insert: (product: Product, callback: (status: any) => void): void => {
    const sql = `insert into product VALUES ('', '${product.productCode}' , '${product.productName}' , '${product.productVendor}', '${product.quantityInStock}', '${product.buyPrice}', '${product.sellPrice}', '${product.productDescription}', '${product.productImage}')`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (product: Product, callback: (status: any) => void): void => {
    const sql = `update product set productCode='${product.productCode}' , productName='${product.productName}' , productVendor='${product.productVendor}', quantityInStock='${product.quantityInStock}', buyPrice='${product.buyPrice}', sellPrice='${product.sellPrice}', productDescription='${product.productDescription}', productImage='${product.productImage}' where id = '${product.id}'`;

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  delete: (id: string, callback: (status: any) => void): void => {
    const sql = `DELETE FROM product WHERE id = '${id}'`;
    console.log(sql);

    db.execute(sql, (status) => {
      callback(status);
    });
  },

  search: (product: Product, callback: (results: any[] | false) => void): void => {
    const sql = `SELECT * FROM product WHERE ${product.searchBy} LIKE '%${product.search}%'`;

    db.getResults(sql, (results) => {
      if (results.length > 0) {
        callback(results);
      } else {
        callback(false);
      }
    });
  }
};
