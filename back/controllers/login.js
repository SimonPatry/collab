import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

// request user model with form datas to find the account
export async function Login (req, res){
  
  const {APP_SECRET, FRONTEND_URL} = process.env;
  const { email } = req.body;

  try {

    const user = await UserModel.find({email}, {password: 1});

    const match = await bcrypt.compare(req.password, user[0].password)
    
    if (match) {
      const token = jsonwebtoken.sign(
        {email, role: user.isAdmin ? "admin" : "user"},
        APP_SECRET,
        {expiresIn: '24h'}
      )
      req.session.token = token;
    }
    req.session.email = req.body.email;
    req.session.firstname = user.firstname;
    req.session.lastname= user.lastname;

    res.status(200).json({
      "status": true,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': FRONTEND_URL,
      token: JSON.stringify(token),
      firstname: user.firstname,
      lastname: user.lastname,
      message: "You are logged in"
    });
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}