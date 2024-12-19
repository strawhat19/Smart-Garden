import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthStates } from '../shared/enums';
import { sharedDatabase } from '../shared/shared';
import { addUser, auth } from '../server/firebase';
import { ROLES, User, userTypes } from '../shared/types/users';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { userFromForm } from '../functions';

export default function Signup() {
  let { users, setUser, setAuthState } = useContext<any>(sharedDatabase);

  const onSignUp = (e?: any) => {
    e.preventDefault();
    let form = e.target;
    let formUser = userFromForm(form, users);

    setAuthState(AuthStates.signin);
    setUser(formUser);
    form.reset();
    
    console.log(`Form User`, formUser);
    toast.success(`User Signed Up as ${formUser.name}`);

    // createUserWithEmailAndPassword(auth, email, password).then(fireBaseUserCred => {
    //   let { uid } = fireBaseUserCred?.user;
    //   formUser = { ...formUser, uid };
    //   addUser(formUser);
    //   // window.location.href = `/signin`;
    // }).catch(fireBaseCreateUserError => {
    //   toast.error(`Failed to Create User`);
    //   console.log(`Firebase Create User Error`, fireBaseCreateUserError);
    //   return;
    // });
  }

  return (
    <div className="form" id="signup">
      <div className="innerForm" style={{ width: `57%` }}>
        <div className='formElements'>
          <div className='formRow'>
            <div className="formCol">
              <div className="formLabel">Sign Up</div>
              <form onSubmit={(e) => onSignUp(e)} id="signupForm" className="signupForm">
                <div id="emailInputSignupItem" className="inputItem">
                  <div className={`authLabel left`} style={{ padding: `0 0 5px 3px` }}>
                    Email
                  </div>
                  <input type="email" name="email" id="emailInputSignup" required />
                </div>
                <div id="passwordInputSignupItem" className="inputItem">
                  <div className={`authLabel left`} style={{ padding: `0 0 5px 3px` }}>
                    Password
                  </div>
                  <input type="password" name="password" id="passwordInputSignup" autoComplete="password" required />
                </div>
                <Button id="signupBtn" title="Signup" className="btn regBtn inputItem" type={`submit`}>
                  Sign Up
                </Button>
              </form>
            </div>
            <div className="emptyColSpacer" />
          </div>
        </div>
      </div>
    </div>
  );
}
