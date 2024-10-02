import Nav from "./nav";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "@mui/material";
import { LazyLoadImage } from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brandName, guest, logoURL, sharedDatabase } from "../shared/shared";
import { faSignOut, faUserTie, faCopyright, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { anchorPosition } from "./menu";

export default function MobileMenu() {
    let { user, menu } = useContext<any>(sharedDatabase);

    return (
        <div className={`menu ${menu[anchorPosition] == true ? `menuOpen` : `menuClosed`}`}>
            <div className={`innerMenu`}>
                <Link href={`/`}>
                    <a title={`Home`}>
                        <LazyLoadImage 
                            alt={`logo`} 
                            src={logoURL} 
                            width={`100%`}
                            effect={`blur`} 
                            height={`auto`} 
                            id={`menuLogo`} 
                            className={`logo`} 
                        />
                        {brandName.split(` `)[0]} {brandName.split(` `)[1]}
                    </a>
                </Link>
                {/* Nav */}
                <Nav direction={`column`} />
                {/* Home Link */}
                {/* <div className="navigation-tab firstLink">
                    <Link href={`/`}>
                        <a className="current active hoverLink" href="./">
                            <FontAwesomeIcon icon={faHouseChimneyUser} /> Home
                        </a>
                    </Link>
                </div> */}
                {/* User Links */}
                {user != guest ? (
                    <>
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
                    </>
                ) : <></>}
            </div>
            <div className="menuDash menuFooter">
                <div className="nameText">
                    <a className="customLink hoverLink" target={`_blank`} href="https://github.com/strawhat19/NextJs-TypeScript-Sass-Starter" title={brandName}>
                        <FontAwesomeIcon icon={faCodeBranch} /> {brandName}
                    </a>
                </div>
                <div className="siteText copyright" title="Copyright">
                    <a href="./" className="hoverLink">
                        <FontAwesomeIcon icon={faCopyright} /> 
                        {(new Date as Date).getFullYear()}
                    </a>
                </div>
            </div>
        </div>
    )
}