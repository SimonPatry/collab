import mongoose from "mongoose";
import UserModel from "../Models/user.model.js";

export const getUser = async (req, res) => {
    const id = req.params.id;    
    const user = await UserModel.findById(id);

    res.header({

    })
    res.json(user);
};

export const getUsers = async () => {
    const users = await UserModel.find({});

    res.json(users);
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