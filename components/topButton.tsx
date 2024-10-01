import { Button } from "@mui/material";
import{useState, useEffect} from "react";
import { scrollTop } from "../functions";
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TopButton() {
    const [show, setShow] = useState<any>(false);
    useEffect(() => {
        window.addEventListener(`scroll`, (event) => window.scrollY > 50 ? setShow(true) : setShow(false));    
        return () => window.removeEventListener(`scroll`, (event) => window.scrollY > 50 ? setShow(true) : setShow(false));
    }, [setShow])
    return (
        <Button className={show ? `visibleButton` : `hiddenButton`} onClick={() => scrollTop()} id="topButton" title="Scroll to top">
           <FontAwesomeIcon className="upArrow" icon={faChevronUp} />
        </Button>
    )
}