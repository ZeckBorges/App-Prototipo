const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../uploads/users.json');


const getUserData = () => {

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        console.log("Arquivo de usuários criado.");
    } else {
        const users = require(filePath);
        const result = users.map(document => {
            return {
            codigo: document.codigo,
            ...document
            };
        });

        console.log(result);
        return result;
    }

    
};

const filterUsers = (searchTerm) => {
  const filteredUsers = getUserData().filter(user => {
    const { name, city, country, favorite_sport } = user;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite_sport.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return filteredUsers;
};

const init = (expressInstance, basePath) => {
  expressInstance.get(`${basePath}api/users`, (req, res) => {
    const searchTerm = req.query.search || '';
    const filteredUsers = filterUsers(searchTerm);
    res.json(filteredUsers);
  });
};

module.exports = {
  init
};
