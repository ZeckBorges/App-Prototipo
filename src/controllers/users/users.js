const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

const create = async (req, res) => {
  const { nome, email, senha } = req.body; // Destructuring para obter os valores do corpo da requisição

  const user = {
    nome,
    email,
    senha
  };

  console.log(user);

  try {
    await db.collection('users').add(user); // Usando "add" para gerar um ID automático para o documento
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao salvar os dados do usuário.' });
  }
};

module.exports = {
  create
};
