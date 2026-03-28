const bcrypt = require('bcrypt');

const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = checkPassword;