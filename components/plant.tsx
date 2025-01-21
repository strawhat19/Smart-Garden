import CustomImage from './customImage';
import { Plant } from '../shared/types/plants';

export class PlantParams { plant: Plant | any; swapping: any; pIdx: any; logoURL: any };

export default function PlantComponent({ plant, swapping, pIdx, logoURL }: PlantParams) {

    return (
        <div className={`slot plantSlot`} data-swapy-slot={`plant_${plant?.id}`}>
            <div 
                data-id={plant.id} 
                id={`plant_${plant.id}`} 
                data-swapy-item={JSON.stringify(plant)}
                className={`plntCard plant plant_inner plant_position_${plant?.id} ${swapping ? `cursorGrab` : ``}`} 
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
            </div>
        </div>
    )
}