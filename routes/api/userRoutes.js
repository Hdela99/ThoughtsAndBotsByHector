const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

//require('/').get(getUsers).post(createUser).delete(deleteUser).put(updateUser);
