import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { sharedDatabase } from '../shared/shared';
import { userTypes } from '../shared/types/users';

export default function Signin() {
  let { user, users, setUser, setAuthState } = useContext<any>(sharedDatabase);

  // const [form, setForm] = useState<any>({email: ``, password: ``});
  // const trackFormInput = (event:any) => {
  //   if (event.target.type === `email`) {
  //     setForm({...form, email: event.target.value});
  //   } else {
  //     setForm({...form, password: event.target.value});
  //   }
  // };

  return (
    <div className='form' id="signin">
      <div className="innerForm" style={{ width: `57%` }}>
        <div className='formElements'>
          <div className='formRow'>
            <div className="formCol">
              <div className="formLabel">Sign In</div>
              <form id="signinForm" className="signinForm">
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
                <Button id="signinBtn" className="btn regBtn inputItem" title='Signin'>Sign In</Button>
              </form>
            </div>
            <div className="emptyColSpacer" />
          </div>
        </div>
      </div>
    </div>
  );
}
