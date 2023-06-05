const users = require('./users')
const file = require('./file')



module.exports.init = (expressInstance, basePath) => {
    users.init(expressInstance, basePath)
    file.init(expressInstance, basePath)
};