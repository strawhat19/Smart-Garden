import { createContext } from 'react';
import { Plant } from './types/plants';
import { ROLES, User } from './types/users';
import { useState, useEffect } from 'react';
import { AuthStates, Themes } from './enums';
import { samplePlants } from '../database/plants';
import { checkForStoredPlants } from '../pages/plants';

export const brandName = `Smart Garden AI`;
export const logoURL = `/assets/SmartGardenIcon.svg`;
export const guest: User = new User({ id: 0, name: `Guest`, role: ROLES.Guest.name, level: ROLES.Guest.level });
export const description = `A tool to help healthy plant growth for personal gardens with AI assistance along the way!`;

export const sharedDatabase = createContext<any>({});

export default function SharedData({ children }: any) {
    const [width, setWidth] = useState<any>(0);
    const [height, setHeight] = useState<any>(0);
    const [show, setShow] = useState<any>(false);
    const [open, setOpen] = useState<any>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(guest);
    const [menu, setMenu] = useState<any>({left: false});
    const [scrolled, setScrolled] = useState<any>(false);
    const [theme, setTheme] = useState<any>(Themes.light);
    const [authState, setAuthState] = useState<AuthStates | any>(AuthStates.signin);

    const defaultPlants = samplePlants.map((plnt: Plant) => new Plant(plnt));
    const [plants, setPlants] = useState<Plant[]>(defaultPlants);

    useEffect(() => {
        checkForStoredPlants(setPlants);

        const windowEvents = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            window.scrollY > 50 ? setShow(true) : setShow(false);
            window.scrollY > 5 ? setScrolled(true) : setScrolled(false);
        };

        windowEvents();
        window.addEventListener(`resize`, () => windowEvents());
        window.addEventListener(`scroll`, () => windowEvents());

        return () => {
            window.removeEventListener(`resize`, () => windowEvents());
            window.removeEventListener(`scroll`, () => windowEvents());
        }
    }, [setWidth, setHeight]);

    return (
        <sharedDatabase.Provider value={{
            width, 
            height, 
            menu, setMenu,
            open, setOpen,
            user, setUser,
            show, setShow,
            users, setUsers,
            theme, setTheme,
            plants, setPlants,
            scrolled, setScrolled,
            authState, setAuthState,
        }}>
            <div title={brandName} className={`app ${theme} ${brandName.replaceAll(` `, `_`)}`}>
                {children}
            </div>
        </sharedDatabase.Provider>
    )
}