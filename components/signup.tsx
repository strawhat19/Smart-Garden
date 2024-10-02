import { useState } from 'react';
import { Button } from '@mui/material';
import { IonCol, IonGrid, IonLabel, IonRow } from '../functions';

export default function Signup() {
  const [form, setForm] = useState<any>({email: ``, password: ``});
  const trackFormInput = (event:any) => {
    if (event.target.type === `email`) {
      setForm({...form, email: event.target.value});
    } else {
      setForm({...form, password: event.target.value});
    }
  };
  return (
    <div className='form' id="signup">
      <div className="innerForm">
        <IonGrid className='formElements'>
          <IonRow className='formRow'>
            <IonCol className="formCol">
              <IonLabel className="formLabel">Sign Up</IonLabel>
              <form id="signupForm" className="signupForm" onInput={(event) => trackFormInput(event)}>
                <div id="emailInputSignupItem" className="inputItem">
                  <IonLabel>Email</IonLabel>
                  <input type="email" id="emailInputSignup" />
                </div>
                <div id="passwordInputSignupItem" className="inputItem">
                  <IonLabel>Password</IonLabel>
                  <input type="password" id="passwordInputSignup" autoComplete="password" />
                </div>
                <Button id="signupBtn" className="btn regBtn inputItem" title='Signup'>Sign Up</Button>
              </form>
            </IonCol>
            <IonCol class="emptyColSpacer" />
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
}
