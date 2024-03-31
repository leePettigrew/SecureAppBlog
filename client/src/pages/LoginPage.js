import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {

    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[redirect,setRedirect] = useState('');


    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:3500/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });


        if(response.ok){
            setRedirect(true);
        }else{
            alert('Incorrect Login')
        }
    }



    if(redirect){
        return < Navigate to={'/'} />
    }

    return(

           <form className="login" onSubmit={login}> 
            <h1>Login</h1>
            <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username"/>
            <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password"/>
            <button>Login</button>
           </form>
      

    );
}
