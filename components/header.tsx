import Nav from "./nav";
import Menu from "./menu";
import Link from "next/link";
import { useContext } from "react";
import { LazyLoadImage } from "../functions";
import { brandName, logoURL, sharedDatabase } from "../shared/shared";

export default function Header() {
    let { width, scrolled } = useContext<any>(sharedDatabase);

    return (
        <header className={`header ${scrolled ? `scrolledHeader` : `nonscrolledHeader`}`}>
            <div className={`innerHeader`}>
                {/* Home Link */}
                {/* <Tooltip title={brandName} arrow> */}
                    {/* <div className={`tooltipElement`}> */}
                        <Link href={`/`}>
                            <a className={`homeHoverLink`}>
                                <LazyLoadImage 
                                    id={`logo`} 
                                    alt={`logo`} 
                                    src={logoURL} 
                                    width={`100%`}
                                    effect={`blur`} 
                                    height={`auto`} 
                                    className={`logo`} 
                                />
                                {brandName}
                            </a>
                        </Link>
                    {/* </div> */}
                {/* </Tooltip> */}
                {/* Nav Menu */}
                {width > 1080 ? <Nav /> : <Menu style={{ marginRight: 15 }} />}
            </div>
        </header>
    )
}