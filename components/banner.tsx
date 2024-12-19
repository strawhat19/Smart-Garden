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
                    <div className={`textContainer`}>
                        <div className={`textInnerContainer`}>
                            <div id={`mainspacercol`} />
                            <div className={`mainSpace`}>
                                <h1>
                                    {title.split(` `)[0]} 
                                    <span className={`bottomText`}>{title.split(` `)[1]} 
                                        <span className="primaryVariant"> {title.split(` `)[2]}</span>
                                    </span>
                                </h1> 
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}