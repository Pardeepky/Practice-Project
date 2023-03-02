import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;
      if (isLogin) {
        setIsLoading(true);
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-CShizmUodvM-OuftQTwj5jMSeS8cIxU', {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setIsLoading(false);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
        } else {
          const err = await res.json();
          alert(err.error.message)
        }
      } else {
        setIsLoading(true);
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-CShizmUodvM-OuftQTwj5jMSeS8cIxU', {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setIsLoading(false);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
        } else {
          const err = await res.json();
          alert(err.error.message)
        }

      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <button>Sending Request...</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
