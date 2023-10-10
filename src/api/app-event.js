const PegawaiService = require("../services/pegawai-service");
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }));
    const service = new PegawaiService();

    app.use('/app-events', async (req,res,next) => {
        const { payload } = req.body;
        const send = await service.SubscribeEvents(payload);
        res.json(send);

    });

}
