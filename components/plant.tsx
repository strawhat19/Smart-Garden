import { useContext } from 'react';
import CustomImage from './customImage';
import { Plant } from '../shared/types/plants';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sharedDatabase, updateIndexBadges } from '../shared/shared';

export class PlantParams { plant: Plant | any; swapping: any; pIdx: any; logoURL: any };

export default function PlantComponent({ plant, swapping, pIdx, logoURL }: PlantParams) {
    const { setPlants } = useContext<any>(sharedDatabase);

    const deletePlant = (plnt: Plant | any) => {
        setPlants((prevPlants: any) => prevPlants.filter((plt: any) => plt.id != plnt.id));
        updateIndexBadges();
    }

    return (
        <div key={pIdx} className={`slot plantSlot`} data-swapy-slot={pIdx + 1}>
            <div 
                data-id={plant.id} 
                id={`plant_${plant.id}`} 
                data-swapy-item={plant.id}
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
                <div data-swapy-no-drag onClick={() => deletePlant(plant)} className={`plantDelete plantIndexBadge badge itemIndexBadge`}>
                    <FontAwesomeIcon icon={faTrash} />
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
            </div>
        </div>
    )
}