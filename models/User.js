import mongoose from 'mongoose'
import { Chat } from './Chat.js'


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    chats: [ Chat.schema ]
})


export const User = mongoose.model('User', userSchema)