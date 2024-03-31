import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

export default function Header () {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:3500/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);



  // calls the logout api and sets username to null so should refresh the ui
function logout(){
  fetch('http://localhost:3500/logout', {
    credentials: 'include',
    method: 'POST',
  });
  setUserInfo(null);
}

const username = userInfo?.username;



    return(
        <header>
        <Link to="/" className="logo">Lee Pettigrew's Blog Site</Link>
  
        <nav>
          {username && (
            <>
              <Link to="/create">Create New Blog Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" >Login</Link>
              <Link to="/register" >Register</Link>
            </>
          )}


        </nav>
  
  
      </header>


    );
}