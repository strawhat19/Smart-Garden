import Link from "next/link";
import { useContext, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { LazyLoadImage, scrollBottom } from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brandName, logoURL, sharedDatabase } from "../shared/shared";
import { faPlantWilt, faUser } from "@fortawesome/free-solid-svg-icons";

export const navOptions = {
    plants: {
        id: `plantsBtn`,
        className: `btn`,
        title: `Plants`,
        icon: faPlantWilt,
        href: `/plants`,
    },
    signin: {
        id: `signinBtn`,
        className: `btn regBtn lightBtn`,
        title: `Sign In`,
        icon: faUser,
    },
    signup: {
        id: `signupBtn`,
        className: `btn regBtn`,
        title: `Sign Up`,
        icon: faUser,
    },
}

export default function Header() {
    let { scrolled, setForm } = useContext<any>(sharedDatabase);

    const [navItems,] = useState<any>(Object.values(navOptions));

    const onRegButtonClick = (e: any, id: any) => {
        if (id == navOptions.signin.id) setForm(`signin`);
        else setForm(`signup`);
        scrollBottom();
    }

    return (
        <header className={`header ${scrolled ? `scrolledHeader` : `nonscrolledHeader`}`}>
            <nav className={`navigation innerHeader`}>
                {/* Home Link */}
                <Tooltip title={brandName} arrow>
                    <div className={`tooltipElement`}>
                        <Link href={`/`}>
                            <a className={`homeHoverLink hoverLink`}>
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
                    </div>
                </Tooltip>
                {/* Nav Menu */}
                <div className={`navButtons buttons`}>
                    {navItems.map((navItem: any, nIdx: any) => {
                        let { id, title, className, icon } = navItem;
                        return (
                            navItem.href ? (
                                <Tooltip key={nIdx} title={title} arrow>
                                    <div className={`tooltipElement`}>
                                        <Link href={navItem.href}>
                                            <a className={className}>
                                                <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                                {title}
                                            </a>
                                        </Link>
                                    </div>
                                </Tooltip>
                            ) : (
                                <Tooltip key={nIdx} title={title} arrow>
                                    <Button 
                                        id={id} 
                                        className={className} 
                                        onClick={(e) => className.includes(`regBtn`) ? onRegButtonClick(e, id) : undefined}
                                    >
                                        <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                        {title}
                                    </Button>
                                </Tooltip>
                            )
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}