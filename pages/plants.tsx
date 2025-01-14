import Page from '../components/page';
import Main from '../components/main';
import { Swapy, createSwapy } from 'swapy';
import Section from '../components/section';
import { useContext, useState } from 'react';
import { ROLES } from '../shared/types/users';
import { Plant } from '../shared/types/plants';
import React, { useEffect, useRef } from 'react';
import PlantComponent from '../components/plant';
import { devEnv, guest, logoURL, sharedDatabase } from '../shared/shared';

export const checkForStoredPlants = (setPlants: any) => {
  let hasStoredPlants = localStorage.getItem(`plants`);
  if (hasStoredPlants) {
    let storedPlants = JSON.parse(hasStoredPlants);
    if (storedPlants) {
      let appPlants = storedPlants.map((plnt: any) => new Plant(plnt));
      if (appPlants) {
        setPlants(appPlants);
      }
    }
  }
}

export default function Plants() {
  let swapyRef = useRef<Swapy | null>(null);
  let [swapping, setSwapping] = useState(false);
  let containerRef = useRef<HTMLDivElement>(null);
  let { user, plants, setPlants } = useContext<any>(sharedDatabase);

  useEffect(() => {
    const initializePlants = (plnts: Plant[] = plants) => {
      let plantsToSet: Plant[] = [];
      if (plnts && plnts?.length > 0) {
        plantsToSet = plnts?.map((plnt: Plant) => new Plant(plnt));
      }
      setPlants(plantsToSet);
    }

    const getPlants = async (fromAPI = false) => {
      if (fromAPI) {
        let plantsURL = `/api/plants`;
        try {
          let plantsResponse = await fetch(plantsURL);
          let plantsJSON = await plantsResponse.json();
          initializePlants(plantsJSON);
        } catch (error) {
          console.log(`Error Getting Plants`, error);
        }
      }
      console.log(`Plants`, plants);
    }
    
    getPlants();

    let userIsSignedIn = user != guest && user.level >= ROLES.Subscriber.level;
    let swapyEnabled = devEnv || userIsSignedIn;

    if (swapyEnabled == false) {
      if (containerRef.current) {
        setSwapping(true);
        swapyRef.current = createSwapy(containerRef.current, {
          // dragOnHold: true,
          animation: `spring`,
          autoScrollOnDrag: true,
        });
        swapyRef.current.onSwapEnd((onSwapEndEvent) => {
          let { hasChanged, slotItemMap } = onSwapEndEvent;
          let { asObject } = slotItemMap;
          if (hasChanged) {
            let updatedArrayOfPlants = Object.values(asObject).map(plnt => new Plant(JSON.parse(plnt)));
            localStorage.setItem(`plants`, JSON.stringify(updatedArrayOfPlants));
            let plantIndexes = document.querySelectorAll(`.plantIndex`);
            if (plantIndexes && plantIndexes.length > 0) {
              plantIndexes.forEach((piEl, pI) => {
                piEl.innerHTML = (pI + 1).toString();
              })
            }
          }
        })
      }
    } else {
      setSwapping(false);
      swapyRef.current?.destroy();
    }

    return () => {
      setSwapping(false);
      swapyRef.current?.destroy();
    }
  }, [user, plants, setPlants]);

  return <>
    <Page id={`plants`} title={`Plants`}>
      <Main className={`plants`} desc={`A place to manage your plants`}>
        <Section className={`plantsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>{swapping ? `Your` : ``} Plants</h2>
          <div className={`plantsContainer`} ref={containerRef}>
            {plants.map((plant: Plant, pIdx: any) => (
              <PlantComponent key={pIdx} pIdx={pIdx} plant={plant} swapping={swapping} logoURL={logoURL} />
            ))}
          </div>
        </Section>
      </Main>
    </Page>
  </>
}