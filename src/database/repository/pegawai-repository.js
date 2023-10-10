
const { PegawaiModel } = require('../models');

class PegawaiRepository {

    async CreatePegawai(payload){
        const { nama_pegawai, phone, email, position, foto } = payload;
        const is_exist = await PegawaiModel.FindPegawaiByEmail(email);
        if(is_exist) throw new Error("Email Sudah Terdaftar!");
        const user = new PegawaiModel.pegawai(
            nama_pegawai,
            phone,
            email,
            position,
            foto,
        )
        const userResult = await user.save();
        return userResult;
    }

   

    async UpdateProfilePegawai(payload){
        const {  pegawai_id, phone, foto} = payload;
        const data = await PegawaiModel.UpdateProfilePegawai({ pegawai_id, phone, foto });
        return data;
    }

    async FindPegawaiById(pegawai_id){

        const existingPegawai = await PegawaiModel.FindPegawaiById(pegawai_id);
        return existingPegawai;
    }

    async FindAllPegawai(){

        const existingPegawai = await PegawaiModel.FindAllPegawai();
        return existingPegawai;
    }
}

module.exports = PegawaiRepository;
