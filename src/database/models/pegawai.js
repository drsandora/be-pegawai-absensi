

class pegawai {
    constructor(nama_pegawai, phone, email, position, foto) {
      this.nama_pegawai = nama_pegawai;
      this.phone = phone;
      this.email = email;
      this.position = position;
      this.foto = foto;
    }
async save() {
        const { PegawaiConnection } = require('../index'); 
        const insertQuery = `
          INSERT INTO pegawai_t (nama_pegawai, phone, email, position, foto)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING pegawai_id, nama_pegawai, phone, email, position, foto;
        `;
        try {
          const result = await PegawaiConnection.one(insertQuery, [
            this.nama_pegawai, this.phone, this.email,
            this.position, this.foto
        ]);
          return result;
        } catch (error) {
            return error.message;
        }
      }
}

async function UpdateProfilePegawai(payload){
    const { PegawaiConnection } = require('../index'); 
    const {  pegawai_id, phone, foto} = payload;
    // return
    try {
        const updatedRows = await PegawaiConnection.result(
            'UPDATE pegawai_t SET phone = $1, foto = $2 WHERE pegawai_id = $3',
            [phone, foto, pegawai_id]
        );
        return { data: `${updatedRows.rowCount}`, message: `Updated ${updatedRows.rowCount} rows successfully` }
    } catch (error) {
        return error.message;
    }
}

async function FindPegawaiById({pegawai_id}) {
    const { PegawaiConnection } = require('../index'); 
    console.log(pegawai_id)
    const query = {
        text: `SELECT * FROM pegawai_t WHERE pegawai_id = $1`,
        values: [pegawai_id],
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result[0];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}

async function FindPegawaiByEmail(email) {
    const { PegawaiConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM pegawai_t WHERE email = $1`,
        values: [email],
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result[0];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}

async function FindAllPegawai() {
    const { PegawaiConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM pegawai_t ORDER BY pegawai_id ASC`,
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}


module.exports = {
pegawai,
FindPegawaiByEmail,
FindAllPegawai,
FindPegawaiById,
UpdateProfilePegawai,
};

