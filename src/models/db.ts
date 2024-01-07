import * as mysql from 'mysql';

function getConnection(callback: (connection: mysql.Connection) => void): void {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crm'
  });

  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  callback(connection);
}

export const db = {
  getResults: (sql: string, callback: (results: any[]) => void): void => {
    getConnection((connection) => {
      connection.query(sql, (error, results) => {
        callback(results);
      });

      connection.end((err) => {
        console.log('connection closed!');
      });
    });
  },

  execute: (sql: string, callback: (status: boolean) => void): void => {
    getConnection((connection) => {
      connection.query(sql, (error, result) => {
        if (result) {
          callback(true);
        } else {
          callback(false);
        }
      });

      connection.end((err) => {
        console.log('connection closed!');
      });
    });
  }
};

export function getResults(sql: string, arg1: (results: string | any[]) => void) {
  throw new Error('Function not implemented.');
}

export function execute(sql: string, arg1: (status: any) => void) {
  throw new Error('Function not implemented.');
}
