import Signup from "./signup";
import Signin from "./signin";
import Explore from "./explore";
import SideMenu from "./sideMenu";
import { useEffect, useState } from "react";
import ScrollToDiscover from "./scrollToDiscover";
import { IonCol, IonGrid, IonRow } from "../functions";
import { brandName, description } from "../shared/shared";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
    const [form, setForm] = useState<any>(`signup`);

    useEffect(() => {
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
    }, [setForm])

    return <>
        <main id="mainSection">

            <SideMenu />

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
    </>
}