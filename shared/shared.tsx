import { createContext } from "react";
import { Plant } from "./types/plants";
import { useState, useEffect } from "react";
import { samplePlants } from "../database/plants";

export const brandName = `Smart Garden AI`;
export const guest = {id: 0, name: `Guest`};
export const logoURL = `/assets/SmartGardenIcon.svg`;
export const description = `A tool to help healthy plant growth for personal gardens with AI assistance along the way!`;

export const sharedDatabase = createContext<any>({});

export default function SharedData({ children }: any) {
    const [width, setWidth] = useState<any>(0);
    const [height, setHeight] = useState<any>(0);
    const [user, setUser] = useState<any>(guest);
    const [show, setShow] = useState<any>(false);
    const [open, setOpen] = useState<any>(false);
    const [form, setForm] = useState<any>(`signin`);
    const [menu, setMenu] = useState<any>({left: false});
    const [scrolled, setScrolled] = useState<any>(false);

    let [plants, setPlants] = useState<Plant[]>(samplePlants?.map((plnt: Plant) => new Plant(plnt)));

    useEffect(() => {
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

    return <sharedDatabase.Provider value={{
        width, 
        height, 
        menu, setMenu,
        open, setOpen,
        user, setUser,
        show, setShow,
        form, setForm,
        plants, setPlants,
        scrolled, setScrolled,
    }}>
        {children}
    </sharedDatabase.Provider>
}