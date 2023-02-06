import mongoose from "mongoose";

const User = mongoose.Schema({
    //_id: {type: mongoose.ObjectId, required: true},
    id: String,
    email: {type: String, required: true},
    password: {type: String, required: true}, 
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: String,
    phone: String,
    birthdate: Date,
    city: String,
    country: String,
    photo: String,
    category: String,
    isAdmin: Boolean
});

const modelName = "users";
const collectionName = "users";
const UserModel = mongoose.model(modelName, User, collectionName);

export default UserModel;