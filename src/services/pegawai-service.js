const { FormateData } = require('../helper')
const { PegawaiRepository } = require('../database'); 
const { pegawai } = require('../api');

class PegawaiService {

    constructor(){
        this.repository = new PegawaiRepository();
    }

    async addPegawai(userInputs){
        const { nama_pegawai, phone, email, position, foto } = userInputs;
        const addPegawai = await this.repository.CreatePegawai({ nama_pegawai, phone, email, position, foto });
        return FormateData(addPegawai );

    }

    async updateProfile(userInputs){
        const { pegawai_id, phone, foto } = userInputs;
        const data = await this.repository.UpdateProfilePegawai({ pegawai_id, phone, foto });
        return FormateData( data );

    }

    async GetAllPegawai(){
        const user = await  this.repository.FindAllPegawai();
        return FormateData(user);
    }

    async GetPegawai(pegawai_id){
        const user = await  this.repository.FindPegawaiById(pegawai_id);
        return FormateData(user);
    }


    async SubscribeEvents(payload){
 
        console.log('Triggering.... pegawai Events')
        const { event, data } =  payload;
        const { pegawai_id } = data;
        switch(event){
            case 'GET_PEGAWAI':
                const result = await this.GetPegawai({pegawai_id});
                return result;
            default:
                break;
        }
 
    }

}

module.exports = PegawaiService;
