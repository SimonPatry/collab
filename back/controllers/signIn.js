import UserModel from "../Models/user.model.js"
import { userExists } from "../middlewares/authentification.js";

export function SignInPage(req, res) {
  res.render("signIn");
}

export const SignIn = async (req, res) => {   
  const {
    gender,
    firstName, 
    lastName, 
    email,
    phone,
    birthdate,
    city,
    country,
    photo,
    category
  } = req.body;
  
  try {
      const user = await userExists(email);
      if (user){
        res.send()
      }
      else {
        await UserModel.create({
          gender,
          firstName, 
          lastName, 
          email,
          password: req.password,
          phone,
          birthdate,
          city,
          country,
          photo,
          category
        });
          delete req.password;
          console.log(`User ${firstName} ${lastName} has been added!\n`);
          res.redirect(`/`);
      }
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}