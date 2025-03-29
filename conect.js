const sqlite = require("sqlite3").verbose();

const conect = new sqlite.Database('./dados.db', (err) =>{
    if (err){
        return console.error(err.message);
    } else {
        console.log("conectado");
    }
})
 
module.exports = conect;