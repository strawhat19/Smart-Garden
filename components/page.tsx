import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import TopButton from "./topButton";
// import { createContext } from 'react';
// import { useState, useEffect } from 'react';
// import { samplePlants } from "../database/plants";
import { brandName, description, logoURL } from "../shared/shared";

export class PageProps {
  title: string = brandName;
  children: any;
  constructor(data: Partial<PageProps>) {
    Object.assign(this, data);
  }
}

export default function Page({ title = brandName, children }: PageProps) {
  // let [plants, setPlants] = useState<any>(samplePlants);

  // useEffect(() => {
  //   const getPlants = async (fromAPI = false) => {
  //     if (fromAPI) {
  //       let plantsURL = `/api/plants`;
  //       try {
  //         let plantsResponse = await fetch(plantsURL);
  //         let plantsJSON = await plantsResponse.json();
  //         let plantsData = plantsJSON?.data; 
  //         setPlants(plantsData);
  //         console.log(`Plants`, plantsData);
  //       } catch (error) {
  //         console.log(`Error Getting Plants`, error);
  //       }
  //     } else {
  //       console.log(`Sample Plants`, plants);
  //     }
  //   }

  //   getPlants();
  // }, [plants]);

  return <>
    <Head>
      <title>{title} | Official</title>
      <meta name="description" content={description} />
      <link rel="icon" href={logoURL} />
    </Head>

    <Header />

    <TopButton />

    <div title={title} className={`page ${title}`}>
      {children}
    </div>

    <Footer />
  </>
}