import Link from "next/link";
import { Button } from "@mui/material";
import { logoURL } from "../shared/shared";
import { LazyLoadImage } from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faHouseChimneyUser, faUserTie, faCopyright, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

export default function MobileMenu() {
    return (
        <div className="menu">
            <div className="innerMenu">
                <Link href={`/`}>
                    <a title="Home">
                        <LazyLoadImage effect="blur" src={logoURL} id={`logo`} className="logo" alt={`logo`} width={`100%`} height={`auto`} />
                        Next.js
                    </a>
                </Link>
                <div className="navigation-tab firstLink">
                    <Link href={`/`}>
                        <a className="current active hoverLink" href="./">
                            <FontAwesomeIcon icon={faHouseChimneyUser} /> Home
                        </a>
                    </Link>
                </div>
                <div className="navigation-tab">
                    <Link href={`/profile`}>
                        <a className="hoverLink" href="./profile" title="Profile">
                            <FontAwesomeIcon icon={faUserTie} /> Profile
                        </a>
                    </Link>
                </div>
                <div className="navigation-tab">
                    <Button
                        className="logoutButton mobileLogout"
                        title="Log Out"
                        style={{
                            color: `white`,
                            textTransform: `none`,
                            fontWeight: `400`,
                            fontSize: `14px !important`,
                        }}>
                            <FontAwesomeIcon icon={faSignOut} /> Logout
                    </Button>
                </div>
            </div>
            <div className="menuDash menuFooter">
                <div className="nameText">
                    <a className="customLink hoverLink" target={`_blank`} href="https://github.com/strawhat19/NextJs-TypeScript-Sass-Starter" title="Next.js Starter">
                        <FontAwesomeIcon icon={faCodeBranch} /> Next.js Starter
                    </a>
                </div>
                <div className="siteText copyright" title="Copyright">
                    <a href="./" className="hoverLink"><FontAwesomeIcon icon={faCopyright} /> {(new Date as Date).getFullYear()}</a>
                </div>
            </div>
        </div>
    )
}