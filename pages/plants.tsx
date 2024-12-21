import Main from "../components/main";
import Page from "../components/page";
import Section from "../components/section";
import { useContext, useEffect } from "react";
import { ROLES } from "../shared/types/users";
import { Plant } from "../shared/types/plants";
import CustomImage from "../components/customImage";
import { guest, logoURL, sharedDatabase } from "../shared/shared";

export default function Plants() {
  let { user, plants, setPlants } = useContext<any>(sharedDatabase);

  useEffect(() => {
    const updateIndexesOnDroppableItems = (event: any, ui: any) => {
      let startItem = ui?.draggable[0];
      let destinationItem = event.target;
      let startItemID = parseFloat(startItem?.dataset?.id);
      let destinationItemID = parseFloat(destinationItem?.dataset?.id);
      setPlants((prevPlants: any[]) => {
        let swappedPlants = [...prevPlants];
        let startIndex = swappedPlants.findIndex(item => item.id === startItemID);
        let destinationIndex = swappedPlants.findIndex(item => item.id === destinationItemID);
        if (startIndex !== -1 && destinationIndex !== -1) {
          let temp = swappedPlants[startIndex];
          swappedPlants[startIndex] = swappedPlants[destinationIndex];
          swappedPlants[destinationIndex] = temp;
        }
        return swappedPlants;
      })
    }

    const setDraggableItems = async (querySelectorClassOrID = `.plntCard`) => {
      await $(querySelectorClassOrID).each(function(this) {
        let sortableDraggableItem: any = $(this);
        // sortableDraggableItem.sortable();
        sortableDraggableItem.addClass(`cursorGrab`);
        sortableDraggableItem.draggable({ helper: `clone` });
        sortableDraggableItem.droppable({
          drop: (event: any, ui: any) => {
            updateIndexesOnDroppableItems(event, ui);
          },
        });
      });
    }

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
    if (user != guest && user.level >= ROLES.Subscriber.level) {
      setDraggableItems();
    }
  }, [user, plants, setPlants]);

  return <>
    <Page id={`plants`} title={`Plants`}>
      <Main className={`plants`} title={`Plants DB Admin`} desc={`A place to manage your plants`}>
        <Section className={`plantsSection`} fontColor={`white`} background={`var(--secondaryVariant)`}>
          <h2>Plants</h2>
          <div className={`plantsContainer`}>
            {plants.map((plant: Plant, pIdx: any) => {
              return (
                <div key={pIdx} data-id={plant.id} id={`plant_${plant.id}`} className={`plntCard plant plant_position_${pIdx + 1}`}>
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
              )
            })}
          </div>
        </Section>
      </Main>
    </Page>
  </>
}