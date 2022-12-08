const bcrypt = require('bcryptjs')

const hashPassword = password => {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = (input, password) => {
    const compare = bcrypt.compareSync(input, password)
    return compare
}

module.exports =  {hashPassword, comparePassword }  