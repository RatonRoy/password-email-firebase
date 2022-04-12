import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import app from './firebase.init';
import { Button, Form, NavLink } from "react-bootstrap";
// this is the import files section and the end line.  
const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState(' ');
  const [registered, setRegister] = useState(false);
  const [password, setPassword] = useState(' ');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(' ');

  const handleOnBlurEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleOnBlurPassword = (e) => {
    setPassword(e.target.value);
  }
  const handelChangeRegister = (e) => {
    setRegister(e.target.checked);
    console.log(registered);
  }
  const handleForgotPass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent');
      })
  }
  const emailVerification = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('send the email ');
      });
  }

  const handleFromSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password Should contain at least one special character');
      return;
    }
    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          const user = res.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          const user = res.user;
          console.log(user);
          setEmail('');
          emailVerification();
          setPassword('');
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
        
      event.preventDefault();
      console.log('the user Information ', email, password)

    }
  }

  return (
    <div className="App">
      {/* <form onSubmit={handleFromSubmit} validated = {validated}>
        <p>
          <small> Email: </small> 
          <input type="email" name="email" id="email" placeholder="Please give your email..." onBlur={handleOnBlurEmail} required/>
        </p>
        <p>
          <small>Password : </small> 

          <input type="password" name="password" id="password" placeholder="Input a strong password....." onBlur={handleOnBlurPassword} required />
        </p>
        <p>
          <input type="submit" value="Submit"  className="submit"/>
        </p>
      </form> */}
      <h2 className="text-primary mb-3"> Please  {registered ? "Login" : "Register"} </h2>
      <Form className="mt-5" onSubmit={handleFromSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onBlur={handleOnBlurEmail} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onBlur={handleOnBlurPassword} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Already Registered ?" onChange ={handelChangeRegister} />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          {registered ? "LogIn" : "Register"}
        </Button>
        <Button  type="" variant="link" onClick={handleForgotPass}>
           Forgot Password  ?
        </Button>
        
      </Form>
    </div>
  );
}

export default App;
