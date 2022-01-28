const db = require('../../data/dbConfig')

const getById = (id) => {
    return db('users')
        .where({ id })
}

const insert = (user) => {
    return db('users')
        .insert(user)
}

module.exports = {
    getById,
    insert
}