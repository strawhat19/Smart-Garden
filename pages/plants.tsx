import Page from '../components/page';
import Main from '../components/main';
import { Swapy, createSwapy } from 'swapy';
import Section from '../components/section';
import { useContext, useState } from 'react';
import { ROLES } from '../shared/types/users';
import { Plant } from '../shared/types/plants';
import React, { useEffect, useRef } from 'react';
import CustomImage from '../components/customImage';
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
    
    if (swapyEnabled) {
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
        {/* <Section className={`kanbanSection`} fontColor={`white`} background={`var(--secondaryVariant)`}> */}
          {/* <h2>Board</h2> */}
          {/* <Kboard /> */}
          {/* <Board /> */}
          {/* <KanbanBoard /> */}
        {/* </Section> */}
        <Section className={`plantsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>{swapping ? `Your` : ``} Plants</h2>
          <div className={`plantsContainer`} ref={containerRef}>
            {plants.map((plant: Plant, pIdx: any) => {
              return (
                <div key={pIdx} className={`slot plantSlot`} data-swapy-slot={pIdx + 1}>
                  <div 
                    data-id={plant.id} 
                    id={`plant_${plant.id}`} 
                    data-swapy-item={JSON.stringify(plant)}
                    className={`plntCard plant plant_position_${pIdx + 1} ${swapping ? `cursorGrab` : ``}`} 
                  >
                    <CustomImage 
                      height={200} 
                      alt={`Plant`} 
                      width={`100%`}
                      effect={`blur`} 
                      data-id={plant.id}
                      className={`plantImage`} 
                      id={`plantImage-${plant.id}`} 
                      src={plant.image != null ? plant.image : logoURL} 
                    />
                    <div className={`plantIndex plantIndexBadge badge itemIndexBadge`}>
                      {pIdx + 1}
                    </div>
                    <div data-id={plant.id} id={`plant_data_row_${plant.id}`} className={`plantDataRow`}>
                      <strong title={`Name`} className={`plantName plantTitle`}>
                        {plant.name}
                      </strong>
                      <i title={`Scientific Name`} className={`scientificName subData`}>
                        {plant.scientific_name}
                      </i>
                      <span title={`Discovered In`} className={`discoveredIn subData`}>
                        Discovered in {plant.discovered_year}
                      </span>
                      <span title={`Author`} className={`author subData`}>
                      By {plant.author}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      </Main>
    </Page>
  </>
}