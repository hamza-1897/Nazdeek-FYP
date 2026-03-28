const bcrypt = require('bcryptjs');

const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = checkPassword;