import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { anchorPosition } from "./menu";
import { Themes } from "../shared/enums";
import { scrollBottom } from "../functions";
import { useContext, useState } from "react";
import { guest, sharedDatabase } from "../shared/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faDatabase, faMoon, faSpa, faSun, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const navOptions = {
    // theme: {
    //     id: `themeBtn`,
    //     className: `btn`,
    //     title: `Theme`,
    //     icon: faMoon,
    //     new: true,
    // },
    api: {
        id: `apiBtn`,
        className: `btn lightBtn`,
        title: `API`,
        href: `/api`,
        icon: faDatabase,
        new: true,
    },
    plants: {
        id: `plantsBtn`,
        className: `btn lightBtn`,
        title: `Plants`,
        href: `/plants`,
        icon: faSpa,
    },
    signin: {
        id: `signinBtn`,
        className: `btn regBtn signinBtn lightBtn`,
        title: `Sign In`,
        icon: faArrowRightToBracket,
        form: `signin`,
        auth: true,
    },
    signup: {
        id: `signupBtn`,
        className: `btn regBtn signupBtn`,
        title: `Sign Up`,
        icon: faUserPlus,
        form: `signup`,
        auth: true,
    },
}

export default function Nav({ direction = `row` }: any) {
    const router = useRouter();
    const [navItems,] = useState<any>(Object.values(navOptions));
    let { user, menu, form, setForm, setMenu, theme, setTheme } = useContext<any>(sharedDatabase);

    const onRegButtonClick = (e: any, id: any) => {
        if (id == navOptions.signin.id) setForm(`signin`);
        else setForm(`signup`);
        scrollBottom();
        if (menu[anchorPosition] == true) {
            setMenu({ [anchorPosition]: false });
        }
    }

    return <>
        <nav className={`navigation buttons ${direction}`}>
            {navItems.map((navItem: any, nIdx: any) => {
                let { id, title, className, icon } = navItem;
                return (
                    navItem.href ? (
                        // <Tooltip key={nIdx} title={title} arrow>
                            // <div className={`tooltipElement`}>
                                <Link key={nIdx} href={navItem.href} target={`_blank`}>
                                    <div className={`navItem navLink ${className} ${router.pathname === navItem?.href ? `active` : `inactive`}`}>
                                        <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                        {title}
                                    </div>
                                </Link>
                            // </div>
                        // </Tooltip>
                    ) : (
                        navItem.auth && user == guest ? (
                            // <Tooltip key={nIdx} title={title} arrow>
                                <Button 
                                    id={id} 
                                    key={nIdx}
                                    onClick={(e) => className.includes(`regBtn`) ? onRegButtonClick(e, id) : undefined}
                                    className={`navItem navButton ${className} ${form == navItem.form ? `active` : `inactive`}`} 
                                >
                                    <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                    {title}
                                </Button>
                            // </Tooltip>
                        ) : title == `Theme` ? (
                            <Button 
                                id={id} 
                                key={nIdx}
                                title={title}
                                onClick={(e) => setTheme(theme == Themes.light ? Themes.dark : Themes.light)}
                                className={`navItem navButton themeBtn ${className} ${theme} ${theme == Themes.dark ? `lightBtn` : ``}`} 
                            >
                                <FontAwesomeIcon icon={theme == Themes.light ? faMoon : faSun} style={{ paddingRight: 15 }} />
                            </Button>
                        ) : (
                            <Button 
                                id={id} 
                                key={nIdx}
                                onClick={(e) => undefined}
                                className={`navItem navButton ${className}`} 
                            >
                                <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                {title}
                            </Button>
                        )
                    )
                )
            })}
        </nav>
    </>
}