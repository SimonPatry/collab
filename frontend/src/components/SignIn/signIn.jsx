import './signin.scss';
<<<<<<< HEAD
import {Button, TextField} from "@mui/material";
import {fetchPost} from "../fetch";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";
=======
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchPost} from "../fetch";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
>>>>>>> mvp
import React from "react";

const SignIn = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_SIGNIN } = process.env;

<<<<<<< HEAD
  // On récupère le context
  const { openError, setOpenError, handleCloseError } = useContext(AppContext);

  // On réinitialise le state d'ouverture du message d'erreur
  useEffect(() => {
    setOpenError(false);
  }, [])

  // On définit un state par défaut pour les credentials
  const emptyCredentials = {
    username: '',
    password: ''
  }

  // Tous les states de SignIn.jsx
  const [credentials, setCredentials] = useState(emptyCredentials);
=======
  const [user, setUser] = useState({gender:"", category:"", lastname:"", firstname:"", mail:"", password:"", city:"", country:"", photo:"", phone:"", birthdate:""});
>>>>>>> mvp

  // Fonction de signin
  const handleSignIn = async(e) => {
    e.preventDefault();
    try{
<<<<<<< HEAD
      await fetchPost(REACT_APP_SIGNIN, credentials)
=======
      await fetchPost(REACT_APP_SIGNIN, user)
>>>>>>> mvp
        .then(res => {
          // Si l'utilisateur n'existe pas, on redirige vers la page de login
          if(res.status === true){
            navigate('/login');
          }
          // Sinon on affiche un message d'erreur et on réinitialise les champs
          else{
<<<<<<< HEAD
            setOpenError(true);
=======
>>>>>>> mvp
            navigate('/sign_in');
            throw new Error(res.message);
          }
        });
    } catch(e) {
      console.error(e);
    }
  }

  // Fonction de mise à jour du formulaire
  const handleChange = (e) => {
<<<<<<< HEAD
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value}
=======
    setUser({
      ...user,
      [e.target.name]: e.target.value}
>>>>>>> mvp
    );
  }

  return (
    <div className="signin">
      <div className="signin__container">
        <div className="signin__container__wrapper">
          <h1>Sign in</h1>
<<<<<<< HEAD
          <form action="/sign_in" method="POST">
            <div className="signin__container__wrapper__input">
              <TextField id="username" className="formInput" label="Username" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="password" className="formInput" label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />
=======
            <div className="signin__container__wrapper__input">
            <TextField id="gender" label="Civilité" value={user.gender} name="gender" onChange={(e) => handleChange(e)} select>
                <MenuItem value="female">Femme</MenuItem>
                <MenuItem value="male">Homme</MenuItem>
            </TextField>
              <TextField id="category" label="category" value={user.category} name="category" onChange={(e) => handleChange(e)} select>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
            </TextField>
              <TextField id="lastname" className="formInput" label="Nom" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="firstname" className="formInput" label="Prénom" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="mail" className="formInput" label="Email" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="password" className="formInput" label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="phone" className="formInput" label="Téléphone" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="birthdate" className="formInput" label="Date de naissance" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="city" className="formInput" label="Ville" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="country" className="formInput" label="Pays" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="photo" className="formInput" label="URL de la photo" color="primary" onChange={(e) => handleChange(e)} />
>>>>>>> mvp
            </div>
            <Button variant="outlined" type="submit" className="signin__container__wrapper__button" onClick={(e) => handleSignIn(e)}>
              Sign in
            </Button>
<<<<<<< HEAD
          </form>
=======
>>>>>>> mvp
        </div>
      </div>
    </div>
  );
}

export default SignIn;