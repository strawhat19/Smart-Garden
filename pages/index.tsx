import Head from "next/head";
import { Modal } from '@mui/material';
import { createContext } from 'react';
import Signin from "../components/signin";
import Header from "../components/header";
import Signup from "../components/signup";
import Explore from '../components/explore';
import { useState, useEffect } from 'react';
import TopButton from "../components/topButton";
import MobileMenu from '../components/mobileMenu';
import { IonCol, IonGrid, IonRow } from '../functions';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ScrollToDiscover from '../components/scrollToDiscover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brandName, description, logoURL } from "../shared/shared";
import { faCopyright, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export const appContext = createContext<any>({});

export default function Home() {
  type Anchor = 'left';
  const [width, setWidth] = useState<any>(0);
  const [height, setHeight] = useState<any>(0);
  const [open, setOpen] = useState<any>(false);
  const [form, setForm] = useState<any>(`signup`);
  const [menu, setMenu] = useState<any>({left: false});

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    anchor = `left`
      if (event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMenu({ ...menu, [anchor]: open });
    };

  useEffect(() => {
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
  }, [setWidth, setHeight, setForm]);

  return (
    <appContext.Provider value={{width, height, form}}>
      <div className="home">
        <Head>
          <title>{brandName} | Official</title>
          <meta name="description" content={description} />
          <link rel="icon" href={logoURL} />
        </Head>
        <Header />
        <TopButton />
        <main id="mainSection">
          <div className="sideMenu">
            <div className="hamburger" title="Menu" onClick={toggleDrawer(`left`, true)}>
              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </div>
            <SwipeableDrawer anchor={`left`} open={menu[`left`]} onClose={toggleDrawer(`left`, false)} onOpen={toggleDrawer(`left`, true)}>
              <MobileMenu />
            </SwipeableDrawer>
            <div className="search" title="Search" onClick={(event) => setOpen(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <Modal open={open} onClose={(event) => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <div className="innerModal">
                <div className="innerContent">
                  <span className="searchText"><FontAwesomeIcon icon={faSearch} /> Search</span>
                  <input type="text" placeholder='Search' className='searchField'/>
                </div>
              </div>
            </Modal>
          </div>
          <div className="innerMain">
            <div className="mainBanner">
              <div className="textCol">
                <IonGrid>
                  <IonRow>
                    <IonCol size='1' id='mainspacercol' />
                    <IonCol class="mainSpace">
                      <h1>{brandName.split(` `)[0]} 
                        <span className={`bottomText`}>{brandName.split(` `)[1]} 
                          <span className="primaryVariant"> {brandName.split(` `)[2]}</span>
                        </span>
                      </h1>   
                      <p>{description}</p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </div>
          </div>
          <ScrollToDiscover />
          <Explore />
        </main>
        <div className="sectionEndText">
          <FontAwesomeIcon icon={faUser} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          REGISTER <span className={`primaryVariant`}>{`//`}</span> TODAY
        </div>
        {form === `signup` ? <Signup /> : <Signin />}
        <div className="sectionEndText">
          <FontAwesomeIcon icon={faCopyright} style={{ paddingRight: 15 }} className={`primaryVariant`} />
          COPYRIGHT <span className={`primaryVariant`}>{`//`}</span> 2024
        </div>
      </div>
    </appContext.Provider>
  );
}
