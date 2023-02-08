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
import Home from './components/Home/Home';
import { Avatar } from '@mui/material';
import Collaborators from './components/Collaborators/Collaborators';

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
  const [user, setUser] = useState();

  // Fonction pour récupérer l'utilisateur
  const fetchUser = async() => {
    try{
      console.log(REACT_APP_USER)
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
    const token = localStorage.getItem('token');
    
    if (token)
      setSessionToken(token);
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
              <Link to="/">Home</Link>
            </div>
            <nav>
              <Link to="/collaborators">Collaborators</Link>
              {
                !sessionToken ? (
                  <>
                    <Link to="/sign_in">Sign in</Link>
                    <Link to="/login">Log in</Link>
                  </>
                )
                :
                (
                  <>
                    <Link to="/" onClick={() => {
                        localStorage.removeItem("token");
                        setUser(emptyUser);
                      }}
                    >
                      <Avatar 
                        alt={`${user.firstname.splice(0, 1)}${user.lastname.splice(0, 1)}`}
                        src={user.photo}
                      />
                      Sign Out
                    </Link>
                  </>
                )
              }
            </nav>
          </header>
          <div className="globalContainer">
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/collaborators" element={<Collaborators />}/>
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