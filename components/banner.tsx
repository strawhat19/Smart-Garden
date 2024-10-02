import { IonCol, IonGrid, IonRow } from "../functions";
import { brandName, description } from "../shared/shared";

export default function Banner({
    title = brandName,
    desc = description,
}: any) {
    return <>
        <div className={`innerMain`}>
            <div className={`mainBanner`}>
                <div className={`textCol`}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size={`1`} id={`mainspacercol`} />
                            <IonCol class={`mainSpace`}>
                                <h1>
                                    {title.split(` `)[0]} 
                                    <span className={`bottomText`}>{title.split(` `)[1]} 
                                        <span className="primaryVariant"> {title.split(` `)[2]}</span>
                                    </span>
                                </h1> 
                                <p>{desc}</p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </div>
        </div>
    </>
}