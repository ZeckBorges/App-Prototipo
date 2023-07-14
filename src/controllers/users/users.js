const firebaseAdmin = require('firebase-admin');

const init = (expressInstance, basePath) => {
    expressInstance.post(`${basePath}api/users`, (req, res) => {
        const users = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
    })
}

module.exports = {
    init
};