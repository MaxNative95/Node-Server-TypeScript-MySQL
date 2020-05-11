"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySql {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user2',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (error, results, fields) => {
            if (error) {
                console.log('Error en query' + error.message);
                return callback(error);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('base de datos online');
        });
    }
}
exports.default = MySql;
