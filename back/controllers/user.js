import mongoose from "mongoose";
import UserModel from "../Models/user.model.js";

export const getUsers = async (req, res) => {
    const users = await UserModel.find({});

    res.json(users);
};

export const getRandomUser = async (req, res) => {
    //get all users
    const users = await UserModel.find({});

    //get one random id from users
    const randomId = Math.floor(Math.random() * (users.length + 1));
    
    res.json(users[randomId]);
};

export const getSessionUser = async (req, res) => {
    const user = await UserModel.find({ email: req.session.email })
    
    res.json(user);
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    
    res.json(user);
};

export const deleteUser = async (req, res) => {
    
    const { id } = req.params;

    try{
        await UserModel.deleteOne({_id: mongoose.Types.ObjectId(id)})
          .then(res => {
            console.log(res);
            res.json("User successfully destroyed")
          })
      } catch(e) {
        console.error(e);
        res.json(e)
      }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;

    const {
        email,
        firstname,
        lastname,
        gender,
        phone,
        birthdate,
        city,
        country,
        photo,
        category,
        isAdmin
    } = req.body;

    const update = await UserModel.updateOne({
            _id: mongoose.Types.ObjectId(id)
        }, 
        {
            email,
            firstname,
            lastname,
            gender,
            phone,
            birthdate,
            city,
            country,
            photo,
            category,
            isAdmin
        })
};