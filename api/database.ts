import mysql from 'mysql2';
import { config } from './config';

const connection = mysql.createConnection({
    host: config.db.host,
    user: 'root',
    password: config.db.password,
    database: config.db.name
});
function query<T>(sql: string, values?: any[] | any): Promise<T> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, data) => {
            if(err) reject(err);
            else resolve(<T>data);
        });
    });
}

export { query }