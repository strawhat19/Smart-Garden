import Signin from "./signin";
import Signup from "./signup";
import { useContext } from "react";
import { appContext } from "../pages";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Footer() { 
    let { form } = useContext<any>(appContext);

    return <>
      <footer className={`footer`}>

        <div className={`sectionEndText`}>
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