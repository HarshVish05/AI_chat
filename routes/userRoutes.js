import { Router } from 'express'
import { getAllUsers, login, userRegister } from '../controllers/userController.js'
import { check } from 'express-validator'

const userRoutes = Router()

userRoutes.get('/', getAllUsers)

userRoutes.post('/register', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Enter a valid email address.').trim().isEmail(),
    check('password', 'Password must be of length 6 or more.').isLength({ min: 6 }),
], userRegister)

userRoutes.post('/login', [
    check('email', 'Enter a valid email address.').trim().isEmail(),
    check('password', 'Password is required').exists(),
], login)

export default userRoutes