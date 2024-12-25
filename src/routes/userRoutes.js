import express from 'express'
import { get, login, logout, signup } from '../controllers/userController.js'
import authToken from '../middleware/auth.js'
import { User } from '../models/userModel.js'

const UserRouter =express.Router()

UserRouter.route('/signup').post(signup)
UserRouter.route('/login').post(login,authToken)
UserRouter.route('/get').get(authToken,get)
UserRouter.route('/logout').get(authToken,logout)

export default UserRouter