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
    const userRecord = await firebaseAdmin.auth().createUser({
      email: user.email,
      password: user.senha,
      displayName: user.nome,
    });

    // Salvando informações adicionais do usuário no Firestore
    await db.collection('users').doc(userRecord.uid).set({
      nome: user.nome,
      email: user.email,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário.' });
  }
};

const login = async (req, res) => {
  const id = req.body.uid;
  console.log('id:',id);

  try {

    // Recuperando informações adicionais do usuário do Firestore
    const userDoc = await db.collection('users').doc(id).get();
    const user = userDoc.data();
    console.log('user',user)

    res.status(200).json({ message: 'Login bem-sucedido!', user });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(401).json({ error: 'Credenciais inválidas.' });
  }
};

module.exports = {
  create,
  login
};
