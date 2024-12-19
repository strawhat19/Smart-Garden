import Signin from "./signin";
import Signup from "./signup";
import { useContext } from "react";
import { AuthStates } from "../shared/enums";
import { sharedDatabase } from "../shared/shared";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";


export default function Footer() { 
    let { authState } = useContext<any>(sharedDatabase);

    return <>
      <footer className={`footer`} style={{ position: `relative`, zIndex: 10 }}>

        <div className={`sectionEndText`} style={{ paddingBottom: 0, paddingTop: 75 }}>
          <FontAwesomeIcon 
            className={`primaryVariant`} 
            style={{ paddingRight: 15 }} 
            icon={authState == AuthStates.signup ? faUserPlus : faArrowRightToBracket} 
          />
          {authState == AuthStates.signup ? `REGISTER` : `WELCOME`} 
          <span className={`primaryVariant`}>{` // `}</span> 
          {authState == AuthStates.signup ? `TODAY` : `BACK`}
        </div>

        {authState === AuthStates.signup ? <Signup /> : <Signin />}

        <div className="sectionEndText">
          <FontAwesomeIcon icon={faCopyright} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          COPYRIGHT 
          <span className={`primaryVariant`}>{` // `}</span> 
          {(new Date as Date).getFullYear()}
        </div>

      </footer>
    </>
}