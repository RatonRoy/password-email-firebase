import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword} from "firebase/auth";
import './App.css';
import React, { useState } from 'react';
import app from './firebase.init';
// this is the import files section and the end line.  
const auth = getAuth(app); 
function App() {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');

  const handleOnBlurEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleOnBlurPassword = (e) => {
    setPassword(e.target.value);
  } 

  const handleFromSubmit = event => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error);
    })
    event.preventDefault();
    console.log('the user Information ', email, password)
  }
  return (
    <div className="App">
      <form onSubmit={handleFromSubmit}>
        <p>
          <label> Email: </label> 
          <input type="email" name="email" id="email" placeholder="Please give your email..." onBlur={handleOnBlurEmail}/>
        </p>
        <p>
          <label>Password : </label> 

          <input type="password" name="password" id="password" placeholder="Input a strong password....." onBlur={handleOnBlurPassword}/>
        </p>
        <p>
          <input type="submit" value="Submit"  className="submit"/>
        </p>
      </form>
    </div>
  );
}

export default App;
