import Server from './server/server';
import router from './router/router';
import MySql from './mysql/mysql';

const server = Server.init(3000);

server.app.use(router)
//MySQL instance
// MySql.instance;

server.start(() => {
    console.log("Corriendo en el puerto 3000");
});