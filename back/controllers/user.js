import mongoose from "mongoose";
import UserModel from "../Models/user.model.js";

export const getUsers = async () => {
    const users = await UserModel.find({});

    res.json(users);
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