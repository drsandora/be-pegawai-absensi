const PegawaiService = require('../services/pegawai-service.js');
const bodyParser = require('body-parser');
const { PublishPostUser, PublishGetUser, PublishUpdatePassword } = require('../helper')
const  UserAuth = require('./middleware/verifytoken');

module.exports = (app, channel) => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }));
    const service = new PegawaiService();

    app.get('/getAllPegawai' , UserAuth, async (req,res) => {
        try {
            const { data } = await service.GetAllPegawai();
            if(!data) throw new Error("Data Tidak Ditemukan!");
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const startIdx = (page - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const itemsOnPage = data.slice(startIdx, endIdx);
            const totalPages = Math.ceil(data.length / pageSize);
          
            res.status(200).json({
              data: itemsOnPage,
              total_data: data.length,
              currentPage: page,
              totalPages: totalPages,
            });

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });



    app.get('/getPegawai' , UserAuth, async (req,res) => {
        try {
            const { pegawai_id } = req.query;
            let { data } = await service.GetPegawai({ pegawai_id });
        
            if(!data) throw new Error("Data Pegawai Tidak Ditemukan!");;
            const payloadUser = { 
                event: 'GET_USER',
                data: { pegawai_id : pegawai_id}
            };
            const getUser = await PublishGetUser(payloadUser);
            if(!getUser) throw new Error("Data User Tidak Ditemukan!");;
            data['password'] = getUser.password;
            res.json({data});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });

    app.post('/updateProfile',  async (req,res,next) => {
        try {
            const { pegawai_id, phone, foto, password } = req.body;
            const { data } = await service.updateProfile({ pegawai_id, phone, foto});
            if(data.data < 0) throw new Error("Data Pegawai Tidak Ditemukan!");
    
            const payload = { 
                event: 'UPDATE_PASSWORD',
                data: { pegawai_id : pegawai_id,  password: password}
            };
            const send = PublishUpdatePassword(payload);
            res.json(data);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    });


    app.post('/addPegawai',  async (req,res,next) => {
        try {
            const { nama_pegawai, phone, email, position, foto, password } = req.body;
            const { data } = await service.addPegawai({ nama_pegawai, phone, email, position, foto});
            if(!data) throw new Error("Data Pegawai Tidak Ditemukan!");
            const payload = { 
                event: 'CREATE_USER',
                data: { pegawai_id : data.pegawai_id, username: data.email, password: password}
            };
            const send = PublishPostUser(payload);
            res.json(data);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    });
}
