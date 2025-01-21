import Page from '../components/page';
import Main from '../components/main';
import { Swapy, createSwapy } from 'swapy';
import Section from '../components/section';
import { useContext, useState } from 'react';
import { ROLES } from '../shared/types/users';
import { Plant } from '../shared/types/plants';
import React, { useEffect, useRef } from 'react';
import PlantComponent from '../components/plant';
import { devEnv, guest, logoURL, sharedDatabase, updateIndexBadges } from '../shared/shared';

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

  const addPlant = () => {

    let existingIDs: any = [];
    let newID = Math.random().toString(36).substr(2, 9);
    if (existingIDs && existingIDs.length > 0) {
      while (existingIDs.includes(newID)) {
        newID = Math.random().toString(36).substr(2, 9);
      }
    }

    setPlants((prevPlants: any) => [...prevPlants, {
      "id": newID,
      "genus_id": 1872,
      "rank": "species",
      "genus": "Trifolium",
      "family": "Fabaceae",
      "status": "accepted",
      "author": "L.",
      "family_name": null,
      "name": "Dutch Clover",
      "discovered_year": 1753,
      "slug": "trifolium-repens",
      "scientific_name": "Trifolium repens",
      "bibliography": "Sp. Pl.: 767 (1753)",
      "image": "https://bs.plantnet.org/image/o/170ca6a6020d9e9f95f86112577aeabcb23f5b96",
      "links": {
          "self": "/api/v1/species/trifolium-repens",
          "plant": "/api/v1/plants/trifolium-repens",
          "genus": "/api/v1/genus/trifolium"
      },
      "synonyms": [
          "Trifolium repens var. maculatum",
          "Amoria repens"
      ]
    }])

    updateIndexBadges();
  }

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

    if (swapyEnabled) {
      if (containerRef.current) {
        setSwapping(true);
        swapyRef.current = createSwapy(containerRef.current, {
          // dragOnHold: true,
          animation: `spring`,
          autoScrollOnDrag: true,
        });
        swapyRef.current.onSwapEnd((onSwapEndEvent) => {
          // let { hasChanged, slotItemMap } = onSwapEndEvent;
          // let { asObject } = slotItemMap;
          // if (hasChanged) {
            // let updatedArrayOfPlants = Object.values(asObject).map(plnt => new Plant(JSON.parse(plnt)));
            // localStorage.setItem(`plants`, JSON.stringify(updatedArrayOfPlants));
            updateIndexBadges();
          // }
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
        <Section>
          <button onClick={() => addPlant()}>
            Add Plant
          </button>
        </Section>
      </Main>
    </Page>
  </>
}