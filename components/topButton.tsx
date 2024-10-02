import { useContext } from "react";
import { Button } from "@mui/material";
import { scrollTop } from "../functions";
import { sharedDatabase } from "../shared/shared";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopButton() {
    let { show } = useContext<any>(sharedDatabase);

    return (
        <div className={`topButtonComponent`}>
            <Button className={show ? `visibleButton` : `hiddenButton`} onClick={() => scrollTop()} id="topButton" title="Scroll to top">
                <FontAwesomeIcon className="upArrow" icon={faChevronUp} />
            </Button>
        </div>
    )
}