const express = require('express');
const app = express();
const port = 3000;
const crud_funcionarios = require("./crud_funcionarios")
const crud_departamentos = require("./crud_departamentos")

app.use(express.json())

app.get("/", (req,res) => {
    res.json({
        pages: {
            funcionarios: "/funcionarios",
            departamentos: "/departamentos"
        }
    })
})

app.get("/funcionarios", (req, res) => {
    crud_funcionarios.Read((err,rows) => {
        if (err){
            res.json({
                status: 500,
                erro: err.message,
            })
        } else {
            res.json(rows)
        }
    })
});

app.post("/funcionarios", (req,res) => {
    const {nome_completo, cpf, telefone, email, cargo, horario_trabalho} = req.body;

    crud_funcionarios.Creat(nome_completo, cpf, telefone, email, cargo, horario_trabalho, (err) => {
        if (err){
            res.json({
                status: 500,
                mensagem: err.message,
            })
        } else {
            res.json({
                mensagem: "Funcionario criado"
            })
        }
    })
});

app.put("/funcionarios/:id", (req,res) => {
    const {nome_completo, cpf, telefone, email, cargo, horario_trabalho} = req.body;
    const id = req.params.id;

    crud_funcionarios.Update(id,nome_completo, cpf, telefone, email, cargo, horario_trabalho, (err,changes) => {
        if (err) {
            res.json({
                status: 500,
                mensagem: err.message,
            })
        } else if (changes === 0){
            res.json({
                status: 404,
                mensagem: "Funcionario não encontrado",
            })
        } else {
            res.json({
                mensagem: "Funcionario atualizado",
            })
        }
    })
});

app.delete("/funcionarios/:id", (req,res) => {
    const id = req.params.id;
    crud_funcionarios.Delete(id, (err, changes) => {
        if (err){
            res.json({
                status: 500,
                erro: err.message,
            })
        } else if (changes === 0){
            res.json({
                status: 404,
                mensagem: "Funcionario não encontrado"
            })
        } else {
            res.json({
                mensagem: "Funcionario deletado",
            })
        }
    })
})

app.get("/departamentos", (req, res) => {
    crud_departamentos.Read((err,rows) => {
        if (err){
            res.json({
                status: 500,
                erro: err.message,
            })
        } else {
            res.json(rows)
        }
    })
});

app.post("/departamentos", (req,res) => {
    const {nome, localizacao, funcionario_id} = req.body;

    crud_departamentos.Creat(nome, localizacao, funcionario_id, (err) => {
        if (err){
            res.json({
                status: 500,
                mensagem: err.message,
            })
        } else {
            res.json({
                mensagem: "departamento criado"
            })
        }
    })
});

app.put("/departamentos/:id", (req,res) => {
    const {nome, localizacao, funcionario_id} = req.body;
    const id = req.params.id;

    crud_departamentos.Update(id, nome, localizacao, funcionario_id, (err,changes) => {
        if (err) {
            res.json({
                status: 500,
                mensagem: err.message,
            })
        } else if (changes === 0){
            res.json({
                status: 404,
                mensagem: "departamento não encontrado",
            })
        } else {
            res.json({
                mensagem: "departamento atualizado",
            })
        }
    })
});

app.delete("/departamentos/:id", (req,res) => {
    const id = req.params.id;
    crud_departamentos.Delete(id, (err, changes) => {
        if (err){
            res.json({
                status: 500,
                erro: err.message,
            })
        } else if (changes === 0){
            res.json({
                status: 404,
                mensagem: "departamento não encontrado"
            })
        } else {
            res.json({
                mensagem: "departamento deletado",
            })
        }
    })
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})
