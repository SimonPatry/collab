import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

// request user model with form datas to find the account
export async function Login (req, res){
  
  const {APP_SECRET} = process.env;
  const { email } = req.body;

  try {

    const user = await UserModel.find({email}, {password: 1});

    const match = await bcrypt.compare(req.password, user[0].password)
    
    if (match) {
      const token = jsonwebtoken.sign(
        {email, role: user},
        APP_SECRET,
        {expiresIn: '24h'}
      )
      req.session.token = token;
    }
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}