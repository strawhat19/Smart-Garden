import Signin from "./signin";
import Signup from "./signup";
import { useContext } from "react";
import { sharedDatabase } from "../shared/shared";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Footer() { 
    let { form } = useContext<any>(sharedDatabase);

    return <>
      <footer className={`footer`} style={{ position: `relative`, zIndex: 10 }}>

        <div className={`sectionEndText`} style={{ paddingBottom: 0, paddingTop: 75 }}>
          <FontAwesomeIcon icon={faUser} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          REGISTER <span className={`primaryVariant`}>{`//`}</span> TODAY
        </div>

        {form === `signup` ? <Signup /> : <Signin />}

        <div className="sectionEndText">
          <FontAwesomeIcon icon={faCopyright} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          COPYRIGHT <span className={`primaryVariant`}>{`//`}</span> {new Date().getFullYear()}
        </div>

      </footer>
    </>
}