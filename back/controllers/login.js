import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

// request user model with form datas to find the account
export async function Login (req, res){
  
  const {APP_SECRET} = process.env;
  const { email } = req.body;

  try {
    const user = await UserModel.find({email}, {password: 1});

    if (user[0].password === req.password) {
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