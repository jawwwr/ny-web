import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import './styles.scss'

var firebaseConfig = {
  apiKey: "AIzaSyBbuvmKHyHvnmipPHRlYabHQRnCIKDGqbc",
  authDomain: "food-wonder.firebaseapp.com",
  databaseURL: "https://food-wonder.firebaseio.com",
  projectId: "food-wonder",
  storageBucket: "food-wonder.appspot.com",
  messagingSenderId: "1030691105053",
  appId: "1:1030691105053:web:75e08935484fb086c399f4",
  measurementId: "G-EZ8EFLQ570"
};

const Navbar: React.FunctionComponent = props => {
  const [cookies, setCookie, removeCookie] = useCookies(['ny-key', 'ny-user']);
  const [google, setGoogle] = useState();

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    const google = new firebase.auth.GoogleAuthProvider();
    setGoogle(google)
    google.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }, [])

  const authApp = async () => {
    firebase.auth().signInWithPopup(google).then(function(result) {
      const { credential, additionalUserInfo } :any = result!;
      const { accessToken } = credential

      setCookie('ny-key', accessToken)
      setCookie('ny-user', additionalUserInfo.profile)
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }
  console.log(cookies['ny-user'])
  return (
    <>
    <nav id="Navbar" className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item brand-text" to="/">
            Food Wonder
          </Link>
          <div className="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            {
              cookies['ny-key'] ?
              <>
                <Link className="navbar-item" to="/user/profile">
                  Profile
                </Link>

                <Link className="navbar-item" to="/user/checkin-history">
                  Check-in History
                </Link>
              </>
              :
              ''
            }
          </div>
          <div className="navbar-end">
            {
              cookies['ny-key'] && cookies['ny-user'] ?
              <>
                <Link to="#" className="navbar-item" onClick={() => {}}> {cookies['ny-user'] ? cookies['ny-user'].name : ''}</Link>
                <Link to="#" className="navbar-item" onClick={() => {
                  removeCookie('ny-key', {path: '/'})
                  removeCookie('ny-user', {path: '/'})
                }}> Logout</Link>
              </>
              : <Link to="#" className="navbar-item" onClick={authApp}> Login with Google</Link>
            }
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
