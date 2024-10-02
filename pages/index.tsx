import { createContext } from 'react';
import Page from "../components/page";
import Home from "../components/home";
import { useState, useEffect } from 'react';
import { samplePlants } from "../database/plants";

export const appContext = createContext<any>({});

export default function App() {
  const [width, setWidth] = useState<any>(0);
  const [height, setHeight] = useState<any>(0);
  const [form, setForm] = useState<any>(`signup`);
  let [plants, setPlants] = useState<any>(samplePlants);

  useEffect(() => {
    const getPlants = async (fromAPI = false) => {
      if (fromAPI) {
        let plantsURL = `/api/plants`;
        try {
          let plantsResponse = await fetch(plantsURL);
          let plantsJSON = await plantsResponse.json();
          let plantsData = plantsJSON?.data; 
          setPlants(plantsData);
          console.log(`Plants`, plantsData);
        } catch (error) {
          console.log(`Error Getting Plants`, error);
        }
      } else {
        console.log(`Sample Plants`, plants);
      }
    }

    const listenForRegButtonClicks = () => {
      document.querySelectorAll(`.regBtn`).forEach(regBtn => regBtn.addEventListener(`click`, event => {
        switch ((event.target as HTMLButtonElement).id) {
          case `signupBtn`:
            setForm(`signup`);
            document.body.scrollTop = 1250;
            document.documentElement.scrollTop = 1250;
            break;
          case `signinBtn`:
            setForm(`signin`);          
            document.body.scrollTop = 1250;
            document.documentElement.scrollTop = 1250;
            break;
        }      
      }));
    }

    listenForRegButtonClicks();
    getPlants();

    const windowEvents = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', () => windowEvents());
    window.addEventListener('scroll', () => windowEvents());

    return () => {
      window.removeEventListener('resize', () => windowEvents());
      window.removeEventListener('scroll', () => windowEvents());
    }
  }, [setWidth, setHeight, setForm, plants]);

  return (
    <appContext.Provider value={{
      width, height, form, plants, setPlants,
    }}>
      <Page title={`Home`}>
        <Home />
      </Page>
    </appContext.Provider>
  );
}
