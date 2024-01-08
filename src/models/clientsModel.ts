import * as db from './db';

interface User {
  username: string;
  password: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  gender?: string;
  id?: string;
}

export const dataController = {
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

  getById: (table: string, id: string, callback: (results: any[]) => void): void => {
    const sql = `select * from ${table} where id='${id}'`;

    db.getResults(sql, (results) => {
      callback(results);
    });
  },

  getAll: (tablename: string, callback: (results: any[]) => void): void => {
    const sql = `select * from ${tablename}`;
    console.log(sql);

    db.getResults(sql, (results) => {
      console.log(results);
      callback(results);
    });
  },

  insert: (user: User, tab: string, callback: (status: any) => void): void => {
    let sql = '';
    if (tab === 'leads') {
      sql = `insert into ${tab} VALUES ('', '${user.name}' , '${user.email}' , '${user.phone}' , '${user.status}', '${user.gender}')`;
    } else {
      sql = `insert into customer VALUES ('', '${user.name}' , '${user.phone}' , 'DHAKA' ,'${user.email}' , 'customer' , '${user.gender}')`;
    }
    db.execute(sql, (status) => {
      callback(status);
    });
  },

  update: (user: User, table: string, callback: (status: any) => void): void => {
    let sql = '';
    if (table === 'leads') {
      sql = `update ${table} set name='${user.name}' , email='${user.email}' , phone='${user.phone}' , status='${user.status}', gender='${user.gender}' where id = '${user.id}' ;`;
    } else {
      sql = `update ${table} set customerName='${user.name}' , customerEmail='${user.email}' , customerContactNumber='${user.phone}' , customerStatus='${user.status}', customerGender='${user.gender}' where id = '${user.id}' ;`;
    }
    console.log(sql);
    db.execute(sql, (status) => {
      callback(status);
    });
  },

  updateById: (tab: string, id: string, callback: (status: any) => void): void => {
    let stat = '';
    const sql = `select * from ${tab} where id='${id}'`;

    db.getResults(sql, (results) => {
      stat = results[0].status;
      if (stat === 'normal') {
        const sql = `update ${tab} set status='Potential' where id= '${id}'`;
        db.execute(sql, (status) => {
          callback(status);
        });
      } else {
        const user = results[0];
        const sql1 = `delete from ${tab} where id = '${id}';`;

        db.execute(sql1, (status) => {
          if (status) {
            const sql2 = `insert into customer VALUES ('', '${user.name}' , '${user.phone}' , 'DHAKA' ,'${user.email}' , 'customer' , '${user.gender}')`;
            console.log(sql2);
            db.execute(sql2, (status) => {
              if (status) {
                callback(status);
              }
            });
          }
        });
      }
    });
  },

  delete: (id: string, tab: string, callback: (status: any) => void): void => {
    const sql = `delete from ${tab} where id = '${id}';`;

    db.execute(sql, (status) => {
      callback(status);
    });
  }
};
