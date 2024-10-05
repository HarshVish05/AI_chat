import { validationResult } from "express-validator";
import { User } from "../models/User.js"
import bcryptjs from "bcryptjs";

export const getAllUsers = async(req, res) => {
    try {

        const users = await User.find()
        res.status(200).json({ users })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }
}


export const userRegister = async(req, res) => {

    // validation part
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name, email, password } = req.body

    try {
        // see if user exists or not
        let user = await User.findOne({ email })
        if(user) return res.status(400).json({ msg: "User already exists" })

        // encrypting the password
        const hashedPassword = await bcryptjs.hash(password, 10)

        // creating a new user instance
        user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        return res.status(201).json({ msg: 'User registered successfully', id: user._id.toString() })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }
}


export const login = async(req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const {  email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if(!user) return res.status(400).json({ msg: "User not registered." })

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

        res.status(200).json({ msg: "Login Successful" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }
}