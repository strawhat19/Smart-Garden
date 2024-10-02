import { useState } from 'react';
import { Button } from '@mui/material';
import { IonCol, IonGrid, IonLabel, IonRow } from '../functions';

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
      <div className="innerForm">
        <IonGrid className='formElements'>
          <IonRow className='formRow'>
            <IonCol className="formCol">
              <IonLabel className="formLabel">Sign In</IonLabel>
              <form id="signinForm" className="signinForm" onInput={(event) => trackFormInput(event)}>
                <div id="emailInputSigninItem" className="inputItem">
                  <IonLabel>Email</IonLabel>
                  <input type="email" id="emailInputSignin" />
                </div>
                <div id="passwordInputSigninItem" className="inputItem">
                  <IonLabel>Password</IonLabel>
                  <input type="password" id="passwordInputSignin" autoComplete="password" />
                </div>
                <Button id="signinBtn" className="btn regBtn inputItem" title='Signin'>Sign In</Button>
              </form>
            </IonCol>
            <IonCol class="emptyColSpacer" />
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
}
