import './App.scss';
import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link,
} from "react-router-dom";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/signIn";
import {fetchJson} from "./components/fetch";
import AppContext from "./context/AppContext";
import {Button, TextField} from "@mui/material";



const App = () => {
  // On importe les variables d'environnement
  const { REACT_APP_USER } = process.env;

  // On définit un state par défaut pour le user
  const emptyUser = {
    username: '',
    hasPlayed: false,
    draw: [],
    combo: ''
  }

  // Tous les state de App.jsx
  const [sessionToken, setSessionToken] = useState('');
  const [userHasPlayed, setUserHasPlayed] = useState("false");
  const [user, setUser] = useState(emptyUser);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Fonction pour récupérer l'utilisateur
  const fetchUser = async() => {
    try{
      return await fetchJson(REACT_APP_USER);
    } catch(e){
      console.error(e);
    }
  }

  // Quand le token est présent, on récupère l'utilisateur
  useEffect(() => {
    sessionToken &&
      fetchUser().then(user => {
        setUser(user);
        user.hasPlayed === true ?
          setUserHasPlayed("true") : setUserHasPlayed("false");
      })
  }, [sessionToken])

  // On met à jour le state du token
  useEffect(() => {
    setSessionToken(localStorage.getItem('token'));
  }, []);

  // On met à jour le state de userHasPlayed
  useEffect(() => {
    setUserHasPlayed(localStorage.getItem('hasPlayed'));
  }, []);

  // Fonction de fermeture du snackbar de succès
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  // Fonction de fermeture du snackbar d'erreur
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  // Données de context
  let providerData = {
    sessionToken,
    user,
    setUser,
    fetchUser,
    openSuccess,
    setOpenSuccess,
    openError,
    setOpenError,
    handleCloseSuccess,
    handleCloseError,
    userHasPlayed,
  };

  return (
    <AppContext.Provider value={providerData}>
      <div className="App">
        <Router>
          <header className="App-header">
            <div>
              <Link to="/">Yams</Link>
            </div>
            <nav>
              <Link to="/winners">Winners</Link>
              {
                !sessionToken ? (
                  <>
                    <Link to="/sign_in">Sign in</Link>
                    <Link to="/login">Log in</Link>
                  </>
                )
                :
                (
                  <a onClick={() => {
                    localStorage.removeItem("token");
                    setUser(emptyUser);
                  }} href="/">Sign out</a>
                )
              }
            </nav>
          </header>
          <div className="globalContainer">
            <Routes>
              <Route exact path="/login" element={<Login setSessionToken={setSessionToken} setUser={setUser} />}/>
              <Route exact path="/sign_in" element={<SignIn />}/>
            </Routes>
          </div>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;