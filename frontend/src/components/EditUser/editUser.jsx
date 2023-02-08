import './editUser.scss';
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchJson, fetchPatch} from "../fetch";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";

const EditUser = () => {
  // Hook de navigation
  const navigate = useNavigate();

  const { id } = useParams();

  // On récupère les variables d'environnement
  const { REACT_APP_USERS } = process.env;

  const [user, setUser] = useState({gender:"", category:"", lastname:"", firstname:"", mail:"", password:"", city:"", country:"", photo:"", phone:"", birthdate:""});

  useEffect(() =>{
    fetchJson(`${REACT_APP_USERS}/${id}`)
    .then(res =>{
        setUser(res);
        console.log(user);
    })
  }, []);

  // Fonction de signin
  const handleSignIn = async(e) => {
    e.preventDefault();
    try{
      await fetchPatch(REACT_APP_USERS, user._id.$oid, user)
        .then(res => {
          // Si l'utilisateur n'existe pas, on redirige vers la page de login
          if(res.status === true){
            navigate('/login');
          }
          // Sinon on affiche un message d'erreur et on réinitialise les champs
          else{
            navigate(`/users/${user._id.$oid}`);
            throw new Error(res.message);
          }
        });
    } catch(e) {
      console.error(e);
    }
  }

  // Fonction de mise à jour du formulaire
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value}
    );
  }
console.log(user);
  return (
    <div className="edituser">
      <div className="edituser__container">
        <div className="edituser__container__wrapper">
          <h1>Modification profil</h1>
            <div className="edituser__container__wrapper__input">
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
            </div>
            <Button  style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="edituser__container__wrapper__button" onClick={(e) => handleSignIn(e)}>
              Modifier
            </Button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;