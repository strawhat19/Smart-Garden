import { createContext } from 'react';
import Page from "../components/page";
import Home from "../components/home";
import { useState, useEffect } from 'react';
import { brandName } from '../shared/shared';
import { samplePlants } from "../database/plants";

export const appContext = createContext<any>({});

export default function App() {
  const [width, setWidth] = useState<any>(0);
  const [height, setHeight] = useState<any>(0);
  const [form, setForm] = useState<any>(`signin`);

  let [plants, setPlants] = useState<any>(samplePlants);

  useEffect(() => {
    const windowEvents = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener(`resize`, () => windowEvents());
    window.addEventListener(`scroll`, () => windowEvents());

    return () => {
      window.removeEventListener(`resize`, () => windowEvents());
      window.removeEventListener(`scroll`, () => windowEvents());
    }
  }, [setWidth, setHeight]);

  return (
    <appContext.Provider value={{
      width, 
      height, 
      form, setForm,
      plants, setPlants,
    }}>
      <Page id={`home`} title={brandName}>
        <Home />
      </Page>
    </appContext.Provider>
  );
}
