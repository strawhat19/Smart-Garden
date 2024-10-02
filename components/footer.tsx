import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() { 
    return <>
        <div className="sectionEndText">
          <FontAwesomeIcon icon={faCopyright} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          COPYRIGHT <span className={`primaryVariant`}>{`//`}</span> {new Date().getFullYear()}
        </div>
    </>
}