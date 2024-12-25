import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    avatar:{
        type:String
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }

})

export const User = mongoose.model('User',userSchema)
