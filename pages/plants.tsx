import Main from "../components/main";
import Page from "../components/page";
import Section from "../components/section";
// import { LazyLoadImage } from "../functions";
import { useContext, useEffect } from "react";
import { Plant } from "../shared/types/plants";
import { logoURL, sharedDatabase } from "../shared/shared";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";

export default function Plants() {
  let { plants, setPlants } = useContext<any>(sharedDatabase);

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
    
  }, [plants, setPlants]);

  return <>
    <Page id={`plants`} title={`Plants`}>
      <Main className={`plants`} title={`Plants DB Admin`} desc={`A place to manage your plants`}>
        <Section className={`plantsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>Plants</h2>
          <div className={`plantsContainer`}>
            {plants.map((plant: Plant, pIdx: any) => {
              return (
                <div key={pIdx} className={`plant`}>
                  <LazyLoadImage 
                    height={200} 
                    alt={`Plant`} 
                    width={`100%`}
                    effect={`blur`} 
                    className={`plantImage`} 
                    id={`plantImage-${plant.id}`} 
                    src={plant.image != null ? plant.image : logoURL} 
                  />
                  {/* <Image
                    alt={plant.scientific_name}
                    width={300} // Desired image width
                    height={200} // Desired image height
                    src={plant.image != null ? plant.image : logoURL} // The path to your image
                    placeholder={`blur`} // Optional: add a blur placeholder while the image is loading
                  /> */}
                  <div className={`plantDataRow`}>
                    <strong title={`Name`} className={`plantName plantTitle`}>{plant.name}</strong>
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
              )
            })}
          </div>
        </Section>
      </Main>
    </Page>
  </>
}