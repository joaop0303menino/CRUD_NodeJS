const db = require("./conect")

function Creat(nome_completo, cpf, telefone, email, cargo, horario_trabalho, callback){
    const sql = "INSERT INTO funcionarios (nome_completo, cpf, telefone, email, cargo, horario_trabalho) VALUES (?,?,?,?,?,?)"
    db.run(sql, [nome_completo, cpf, telefone, email, cargo, horario_trabalho], (err) =>{
        callback(err);
    })
};
 
function Read(callback){
    db.all("SELECT * FROM funcionarios", (err, rows) => {
        callback(err,rows);
    })
};

function Update(id,nome_completo, cpf, telefone, email, cargo, horario_trabalho, callback){
    const sql = "UPDATE funcionarios SET nome_completo = ?, cpf = ?, telefone = ?, email = ?, cargo = ?, horario_trabalho = ? WHERE id = ?"
    db.run(sql, [nome_completo, cpf, telefone, email, cargo, horario_trabalho, id], (err) => {
        callback(err);
    })
};

function Delete(id,callback){
    db.run("DELETE FROM funcionarios WHERE id = ?", [id], (err) => {
        callback(err, this.changes);
    })
};

module.exports = {db,Creat,Read,Update,Delete}