import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { anchorPosition } from "./menu";
import { scrollBottom } from "../functions";
import { useContext, useState } from "react";
import { AuthStates, Themes } from "../shared/enums";
import { guest, sharedDatabase } from "../shared/shared";
import { ROLES, userTypes } from "../shared/types/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faDatabase, faMoon, faSignOut, faSignOutAlt, faSpa, faSun, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export class NavItem {
    icon: any;
    id: string = ``;
    href: string = ``;
    title: string = ``;
    new?: boolean = false;
    auth?: boolean = false;
    className: string = ``;
    authState?: string = ``;
    constructor(data: Partial<NavItem>) {
        Object.assign(this, data);
    }
}

export const navOptions = {
    theme: new NavItem({
        id: `themeBtn`,
        className: `btn`,
        title: `Theme`,
        icon: faMoon,
        new: true,
    }),
    api: new NavItem({
        id: `apiBtn`,
        className: `btn lightBtn`,
        title: `API`,
        href: `/api`,
        icon: faDatabase,
        new: true,
    }),
    plants: new NavItem({
        id: `plantsBtn`,
        className: `btn lightBtn`,
        title: `Plants`,
        href: `/plants`,
        icon: faSpa,
    }),
    signin: new NavItem({
        id: `signinBtn`,
        className: `btn regBtn signinBtn lightBtn`,
        title: `Sign In`,
        icon: faArrowRightToBracket,
        authState: AuthStates.signin,
        auth: true,
    }),
    signup: new NavItem({
        id: `signupBtn`,
        className: `btn regBtn signupBtn`,
        title: `Sign Up`,
        icon: faUserPlus,
        authState: AuthStates.signup,
        auth: true,
    }),
    signout: new NavItem({
        id: `signoutBtn`,
        className: `btn regBtn signoutBtn`,
        title: `Sign Out`,
        icon: faSignOut,
        authState: AuthStates.signout,
        auth: true,
    }),
}

export default function Nav({ direction = `row` }: any) {
    const router = useRouter();
    const [navItems,] = useState<NavItem[]>(Object.values(navOptions));
    let { user, setUser, menu, authState, setAuthState, setMenu, theme, setTheme } = useContext<any>(sharedDatabase);

    const onSignOut = (e?: any) => {
        setUser(guest);
        setAuthState(AuthStates.signup);
    }

    const onRegButtonClick = (e: any, id: any) => {
        if (id == navOptions.signin.id) setAuthState(AuthStates.signin);
        else setAuthState(AuthStates.signup);
        scrollBottom();
        if (menu[anchorPosition] == true) {
            setMenu({ [anchorPosition]: false });
        }
    }

    return <>
        <nav className={`navigation buttons ${direction}`}>
            {navItems.map((navItem: NavItem, nIdx: any) => {
                let { id, title, className, icon } = navItem;
                return (
                    navItem.href ? (
                        // <Tooltip key={nIdx} title={title} arrow>
                            // <div className={`tooltipElement`}>
                                <Link key={nIdx} href={navItem.href} target={navItem.new ? `_blank` : `_self`} passHref={true}>
                                    <div className={`navItem navLink ${className} ${router.pathname === navItem?.href ? `active` : `inactive`}`}>
                                        <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                        {title}
                                    </div>
                                </Link>
                            // </div>
                        // </Tooltip>
                    ) : (
                        navItem.auth && (user == guest || user.type == userTypes.simulated) ? (
                            // <Tooltip key={nIdx} title={title} arrow>
                                user.level > ROLES.Guest.level ? (
                                    navItem.authState == AuthStates.signout ? (
                                        <Button 
                                            id={id} 
                                            key={nIdx}
                                            onClick={(e) => onSignOut(e)}
                                            className={`navItem navButton signOutBtn ${className}`} 
                                        >
                                            <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                            {title}
                                        </Button>
                                    ) : (
                                        <div key={nIdx} className={`empty emptySpacer`}>
                                            {/* Empty */}
                                        </div>
                                    )
                                ) : (
                                    navItem.authState != AuthStates.signout ? (
                                        <Button 
                                            id={id} 
                                            key={nIdx}
                                            onClick={(e) => className.includes(`regBtn`) ? onRegButtonClick(e, id) : undefined}
                                            className={`navItem navButton ${className} ${authState == navItem.authState ? `active` : `inactive`}`} 
                                        >
                                            <FontAwesomeIcon icon={icon} style={{ paddingRight: 15 }} />
                                            {title}
                                        </Button>
                                    ) : (
                                        <div key={nIdx} className={`empty emptySpacer`}>
                                            {/* Empty */}
                                        </div>
                                    )
                                )
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