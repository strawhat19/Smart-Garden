import { useState } from 'react';
import { Button } from '@mui/material';

export default function Signin() {
  const [form, setForm] = useState<any>({email: ``, password: ``});
  const trackFormInput = (event:any) => {
    if (event.target.type === `email`) {
      setForm({...form, email: event.target.value});
    } else {
      setForm({...form, password: event.target.value});
    }
  };
  return (
    <div className='form' id="signin">
      <div className="innerForm" style={{ width: `57%` }}>
        <div className='formElements'>
          <div className='formRow'>
            <div className="formCol">
              <div className="formLabel">Sign In</div>
              <form id="signinForm" className="signinForm" onInput={(event) => trackFormInput(event)}>
                <div id="emailInputSigninItem" className="inputItem">
                  <div>Email</div>
                  <input type="email" id="emailInputSignin" />
                </div>
                <div id="passwordInputSigninItem" className="inputItem">
                  <div>Password</div>
                  <input type="password" id="passwordInputSignin" autoComplete="password" />
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
