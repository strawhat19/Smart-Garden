import CustomImage from './customImage';
import { createSwapy, Swapy } from 'swapy';
import { Plant } from '../shared/types/plants';
import { devEnv, sharedDatabase } from '../shared/shared';
import { useContext, useEffect, useRef, useState } from 'react';

export class PlantParams { plant: Plant | any; swapping: any; pIdx: any; logoURL: any };

export default function PlantComponent({ plant, swapping, pIdx, logoURL }: PlantParams) {
    let plantSwapyRef = useRef<Swapy | null>(null);
    let [plantSwapping, setPlantSwapping] = useState(false);
    let plantTasksContainerRef = useRef<HTMLDivElement>(null);
    let [subtasks, setSubtasks] = useState([{ id: 1, name: `Sub Task 1` }, { id: 2, name: `Sub Task 2` }, { id: 3, name: `Sub Task 3` }]);

    useEffect(() => {
        if (plantTasksContainerRef.current) {
            setPlantSwapping(true);

            plantSwapyRef.current = createSwapy(plantTasksContainerRef?.current, {
                animation: `spring`,
                autoScrollOnDrag: true,
            });

            // plantSwapyRef.current.onSwapEnd((onSwapEndEvent) => {
            //     let { hasChanged, slotItemMap } = onSwapEndEvent;
            //     let { asObject } = slotItemMap;
            //     if (hasChanged) {
            //         let updatedElements = Object.values(asObject);
            //         devEnv && console.log(`Updated Elements`, updatedElements);
            //     }
            // })
        } else {
            setPlantSwapping(false);
            plantSwapyRef.current?.destroy();
        }

        return () => {
            setPlantSwapping(false);
            plantSwapyRef.current?.destroy();
        }
    }, [subtasks])

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
                {/* <div ref={plantTasksContainerRef} className={`plant_subtasks`}>
                    {subtasks.map((task: any, tIdx: number) => (
                        <div key={tIdx} className={`slot plantTaskSlot`} data-swapy-slot={task?.name}>
                            <div className={`subtask`} style={{ cursor: plantSwapping ? `grab` : `auto` }}>
                                {task?.name}
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}