import { appContext } from ".";
import Main from "../components/main";
import Page from "../components/page";
import { useContext, useEffect } from "react";

export default function Plants() {
    let { plants, setPlants } = useContext<any>(appContext);

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
    
        getPlants();
    }, [plants, setPlants]);

    return <>
        <Page id={`plants`} title={`Plants`}>
            <Main className={`plants`} title={`Plants DB Admin`} desc={`A place to manage your plants`}>
                <section className={`section plantsSection`} style={{ background: `var(--secondary)`, color: `white`, padding: `var(--sectionPadding)` }}>
                    <h2>Plants</h2>
                </section>
            </Main>
        </Page>
    </>
}