import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { ROLES, User } from '../shared/types/users';
import { sharedDatabase } from '../shared/shared';
import { addUser, auth } from '../server/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { IonCol, IonGrid, IonLabel, IonRow } from '../functions';

export default function Signup() {
  let { users } = useContext<any>(sharedDatabase);

  const createUserFromForm = (form: any) => {
    let { email: emailField, password: passwordField } = form;

    let email = emailField?.value;
    let password = passwordField?.value;

    let usersLength = users ? users?.length : 0;
    let index = usersLength + 1;

    let newUser = new User({
      email,
      index,
      password,
      role: ROLES.Subscriber.name,
      level: ROLES.Subscriber.level,
    });

    return newUser;
  }

  const onSignUp = (e?: any) => {
    e.preventDefault();
    let form = e.target;
    let newUser = createUserFromForm(form);
    console.log(`New User`, newUser);
    toast.success(`User Signed Up`);
    // form.reset();

    // createUserWithEmailAndPassword(auth, email, password).then(fireBaseUserCred => {
    //   let { uid } = fireBaseUserCred?.user;
    //   newUser = { ...newUser, uid };
    //   addUser(newUser);
    //   // window.location.href = `/signin`;
    // }).catch(fireBaseCreateUserError => {
    //   toast.error(`Failed to Create User`);
    //   console.log(`Firebase Create User Error`, fireBaseCreateUserError);
    //   return;
    // });
  }

  return (
    <div className="form" id="signup">
      <div className="innerForm">
        <IonGrid className='formElements'>
          <IonRow className='formRow'>
            <IonCol className="formCol">
              <IonLabel className="formLabel">Sign Up</IonLabel>
              <form onSubmit={(e) => onSignUp(e)} id="signupForm" className="signupForm">
                <div id="emailInputSignupItem" className="inputItem">
                  <IonLabel>Email</IonLabel>
                  <input type="email" name="email" id="emailInputSignup" required />
                </div>
                <div id="passwordInputSignupItem" className="inputItem">
                  <IonLabel>Password</IonLabel>
                  <input type="password" name="password" id="passwordInputSignup" autoComplete="password" required />
                </div>
                <Button id="signupBtn" title="Signup" className="btn regBtn inputItem" type={`submit`}>
                  Sign Up
                </Button>
              </form>
            </IonCol>
            <IonCol class="emptyColSpacer" />
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
}
