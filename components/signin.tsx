import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { userFromForm } from '../functions';
import { useContext, useState } from 'react';
import { AuthStates } from '../shared/enums';
import { guest, sharedDatabase } from '../shared/shared';
import { ROLES, userTypes } from '../shared/types/users';

export default function Signin() {
  let { user, users, setUser, setAuthState } = useContext<any>(sharedDatabase);

  const onSignIn = (e?: any) => {
    e.preventDefault();
    let form = e.target;
    let formUser = userFromForm(form, users, ROLES.Subscriber);

    setAuthState(AuthStates.signin);
    setUser(formUser);
    form.reset();
    
    console.log(`Sign In Form User`, formUser);
    toast.success(`User Signed In as ${formUser.name}`);
  }

  return (
    <div className='form' id="signin">
      <div className="innerForm" style={{ width: `57%` }}>
        <div className='formElements'>
          <div className='formRow'>
            <div className="formCol">
              <div className="formLabel">
                {user.level > ROLES.Guest.level ? `Welcome ${user.name}` : `Sign In`}
              </div>
              {user.level <= ROLES.Guest.level ? (
                <form onSubmit={(e) => onSignIn(e)} id="signinForm" className="signinForm">
                  <div id="emailInputSigninItem" className="inputItem">
                    <div className={`authLabel left`} style={{ padding: `0 0 5px 3px` }}>
                      Email
                    </div>
                    <input 
                      type="email" 
                      name="email" 
                      id="emailInputSignin" 
                      defaultValue={user.type == userTypes.simulated ? user.email : ``} 
                      required 
                    />
                  </div>
                  <div id="passwordInputSigninItem" className="inputItem">
                    <div className={`authLabel left`} style={{ padding: `0 0 5px 3px` }}>
                      Password
                    </div>
                    <input 
                      type="password" 
                      name="password" 
                      id="passwordInputSignin" 
                      autoComplete="password" 
                      defaultValue={user.type == userTypes.simulated ? user.password : ``} 
                      required 
                    />
                  </div>
                  <Button id="signinBtn" title="Sign In" type="submit" className="btn regBtn inputItem">
                    Sign In
                  </Button>
                </form>
              ) : (
                <div className={`signedInState`}>
                  <i>Signed In Successfully</i>
                </div>
              )}
            </div>
            <div className="emptyColSpacer" />
          </div>
        </div>
      </div>
    </div>
  );
}
