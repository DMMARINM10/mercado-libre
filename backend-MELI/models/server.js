
const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.path = '/api/items';

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body parse
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.path, require('../routes/items.js'));
    }
    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port', this.port);
        });
    }
}

module.exports = Server;