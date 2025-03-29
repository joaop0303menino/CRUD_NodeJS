const db = require("./conect")

function Creat(nome, localizacao, funcionario_id, callback){
    const sql = "INSERT INTO departamentos (nome, localizacao, funcionario_id) VALUES (?,?,?)"
    db.run(sql, [nome, localizacao, funcionario_id], (err) =>{
        callback(err);
    })
};
 
function Read(callback){
    db.all("SELECT * FROM departamentos", (err, rows) => {
        callback(err,rows);
    })
};

function Update(id,nome, localizacao, funcionario_id, callback){
    const sql = "UPDATE departamentos SET nome = ?, localizacao = ?, funcionario_id = ? WHERE id = ?"
    db.run(sql, [nome, localizacao, funcionario_id, id], (err) => {
        callback(err);
    })
};

function Delete(id,callback){
    db.run("DELETE FROM departamentos WHERE id = ?", [id], (err) => {
        callback(err, this.changes);
    })
};

module.exports = {db,Creat,Read,Update,Delete}