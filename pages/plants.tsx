import { useContext } from 'react';
import Page from '../components/page';
import Main from '../components/main';
import { Swapy, createSwapy } from 'swapy';
import Section from '../components/section';
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
  let swapyOuterRef = useRef<Swapy | null>(null);
  let plantsContainerRef = useRef<HTMLDivElement>(null);
  let { user, plants, setPlants, swapping, setSwapping } = useContext<any>(sharedDatabase);

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
      if (plantsContainerRef.current) {
        setSwapping(true);

        swapyOuterRef.current = createSwapy(plantsContainerRef.current, {
          // group: `plants`,
          // dragOnHold: true,
          animation: `spring`,
          // enabled: swapping,
          autoScrollOnDrag: true,
        } as any);

        // let trg: any = null;
        // swapyOuterRef.current.onBeforeSwap(({ source, target }: any): any => {
        //   if (target) {
        //     trg = target;
        //     // if (target?.getAttribute(`data-swapy-slot`)?.startsWith(`subtask`)) {
        //     //   return false; // Prevent swapping into subtask slots
        //     // }
        //   }
        // });        

        swapyOuterRef.current.onSwapEnd((onSwapEndEvent) => {
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
          // if (trg != null) {
          //   if (trg?.getAttribute(`data-swapy-slot`)?.startsWith(`subtask`)) {
          //     return true; // Prevent swapping into subtask slots
          //   }
          // }
        })
      }
    } else {
      setSwapping(false);
      swapyOuterRef.current?.destroy();
    }

    console.log(`outer`, {swapping})

    return () => {
      setSwapping(false);
      swapyOuterRef.current?.destroy();
    }
  }, [user, plants, swapping, setPlants, setSwapping]);

  return <>
    <Page id={`plants`} title={`Plants`}>
      <Main className={`plants`} desc={`A place to manage your plants`}>
        {/* <Section className={`experimentsSection`} fontColor={`white`} background={`var(--primaryVariant)`}>
          <DND />
        </Section> */}
        <Section className={`plantsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>{swapping ? `Your` : ``} Plants</h2>
          <div className={`plantsContainer`} ref={plantsContainerRef}>
            {plants.map((plant: Plant, pIdx: any) => (
              <div key={pIdx} className={`plant`}>
                <PlantComponent key={pIdx} pIdx={pIdx} plant={plant} swapping={swapping} logoURL={logoURL} />
                {/* <Subtasks plant={plant} /> */}
              </div>
            ))}
          </div>
        </Section>
      </Main>
    </Page>
  </>
}