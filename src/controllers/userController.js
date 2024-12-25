import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signup = async(req,res)=>{
    try{

        const {username,email,password} = req.body
        console.log(username,email)
        if(!username || !email || !password){
            throw new Error("Please fill all the fields")
        }
        const encriptedPassword = await bcryptjs.hash(password,10)
        const newUser = await User.create({
            username,
            email,
            password:encriptedPassword
        })
        await newUser.save()
        return res.status(200).json({
            message:"User Created Successfully",
            data:newUser
        })

    }
    catch(error){
        throw new Error("Error occured while creating User")
    }
    
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email,!password){
            throw new Error("Please fill all the fields")

        }

        const user = await User.findOne({email})
        if(!user){
            throw new Error("User not found signup first")
        }

        const checkPass = await bcryptjs.compare(password,user.password)
        if(!checkPass){
            throw new Error("Password is incorrect")
        }
        const token =  jwt.sign({email:user.email,userId:user._id},process.env.JWT_KEY,{expiresIn:"5h"})
        user.accessToken = token
        await user.save()
        
        res.cookie('jwt',token ,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            secure:true
        })

        return res.status(200).json({
            message:"Login successfully",
            data:user
        })


    } catch (error) {
        throw new Error("Error occured while logging in" +   error)
    }
}

const get = async(req,res)=>{
    try{
        const user = req.user
        return res.status(200).json({
            message:"User found",
            data:user
        })
    }catch(error){
        throw new Error(error+ "Cannot get User login first")
    }
}

const logout = async(req,res)=>{
    try {
        const user = req.user
        console.log(user)
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true
        })
     

        return res.status(200).json({
            message:"Logged out successfully"
        })
        
    } catch (error) {
        throw new Error(error + "Error during logout")
    }
}
export {signup,login,logout,get}