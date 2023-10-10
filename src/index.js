const express = require('express');
const { pegawai, appEvent } = require('./api');

const StartServer = async() => {

    const app = express();
    const port = 8002;
    appEvent(app)
    pegawai(app);
    app.listen(port, () => {

        console.log(`Pegawai is Listening to Port ${port}`)
    })
    
    

}

StartServer();

