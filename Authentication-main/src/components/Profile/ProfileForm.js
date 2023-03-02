import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/Auth-Context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const enteredPassword = newPasswordRef.current.value;
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-CShizmUodvM-OuftQTwj5jMSeS8cIxU', {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        history.replace('/')
      } else {
        const err = await res.json();
        alert(err.error.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
