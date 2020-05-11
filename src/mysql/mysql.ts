import mysql = require('mysql');

export default class MySql {

    private static _instance: MySql;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user2',
            password: '123456',
            database: 'node_db'
        })

        this.conectarDB()
    }


    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (error, results : Object[], fields) => {
            if(error){
                console.log('Error en query' + error.message);
                return callback(error);
            }

            if(results.length === 0){
                callback('El registro solicitado no existe');
            }

            callback(null, results);

        })
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('base de datos online');
        })
    }

}