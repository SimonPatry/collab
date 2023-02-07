import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../Models/user.model.js"
import bcrypt from "bcrypt";

dotenv.config();

const {APP_SECRET} = process.env;

// Password security hash

export const hashPass = (req, res, next) => {
    const { password } = req.body;

    const hashedPass = bcrypt.hash(password, 10);
    
    //replace by new pw
    req.password = hashedPass;

    next();
};

// JWT verification and authorization
export function authVerif(req, res, next){
    if (!req.session.token) {
        return res.status(401).json({
          Unauthorized: 'Please, login with a valid token'
        });
    }
    
    try {
        jsonwebtoken.verify(req.session.token, APP_SECRET);
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const userExists = async(email) => {
    try {
        const user = await UserModel.find({ email });
        if(user.length)
           return true;
        else
            return false;
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
}

export const isAdmin = async () => {
    try {
        const user = await UserModel.find({ email });
        if(user.isAdmin)
           return true;
        else
            return false;
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
};