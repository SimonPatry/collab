import './App.scss';
import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link,
} from "react-router-dom";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/signIn";
import EditUser from './components/EditUser/editUser';
import {fetchJson} from "./components/fetch";
import AppContext from "./context/AppContext";
import {Button, TextField} from "@mui/material";



const App = () => {
  // On importe les variables d'environnement
  const { REACT_APP_USER } = process.env;

  // On définit un state par défaut pour le user
  const emptyUser = {
    firstname: '',
    lastname: '',
    email: '',
  }

  // Tous les state de App.jsx
  const [sessionToken, setSessionToken] = useState('');
  const [user, setUser] = useState(emptyUser);

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

      })
  }, [sessionToken])

  // On met à jour le state du token
  useEffect(() => {
    setSessionToken(localStorage.getItem('token'));
  }, []);

  // Données de context
  let providerData = {
    sessionToken,
    setSessionToken,
    user,
    setUser,
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
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/sign_in" element={<SignIn />}/>
              <Route exact path='/users/:id' element={<EditUser/>}/>
            </Routes>
          </div>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;