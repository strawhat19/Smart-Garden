import { helperFunctions } from "../../functions";

export class TreflePlant {
    id!: number;
    slug!: string;
    genus!: string;
    family!: string;
    genus_id!: number;
    scientific_name!: string;
    status!: `accepted` | `unknown`;
    rank!: `species` | `ssp` | `var` | `form` | `hybrid` | `subvar`;
  
    links?: object;
    year?: number | null;
    author?: string | null;
    image_url?: string | null;
    synonyms?: string[] | null;
    common_name?: string | null;
    bibliography?: string | null;
    family_common_name?: string | null;
  
    constructor(data?: Partial<TreflePlant>) {
      Object.assign(this, data);
    }
}
  
export class Plant {
    id: any = 77116;
    genus_id: number = 3519;
    rank: string = `species`;
    genus: string = `Quercus`;
    family: string = `Fagaceae`;
    status: string = `accepted`;
    author: string | null = `Lam.`;
    family_name: string | null = null;
    name: string | null = `common_name`;
    discovered_year: number | null = 1785;
    slug: string = `quercus-rotundifolia`;
    scientific_name: string = `Quercus Rotundifolia`;
    bibliography: string | null = `Encycl. 1: 723 (1785)`;
    image: string | null = `https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg`;
    links?: object = {
      self: `/api/v1/species/quercus-rotundifolia`,
      plant: `/api/v1/plants/quercus-rotundifolia`,
      genus: `/api/v1/genus/quercus`,
    };
    synonyms?: string[] | null = [
      `Quercus ilex var. oleoides`, `Quercus ilex subvar. rotundifolia`, `Quercus ilex f. macrophylla`, `Quercus ilex f. oleoides`, `Quercus ilex var. calicina`, `Quercus ilex subsp. rotundifolia`, `Quercus lyauteyi`, `Quercus ballota var. rotundifolia`, `Quercus ilex f. brevicupulata`, `Quercus ilex subvar. major`, `Quercus ilex var. pendula`, `Quercus rotundifolia f. dolichocalyx`, `Quercus calicina`, `Quercus rotundifolia f. pilosella`, `Quercus rotundifolia f. macrocarpa`, `Quercus ilex var. rotundifolia`, `Quercus sugaro`, `Quercus ilex subvar. pendula`, `Quercus ilex f. pendula`, `Quercus ilex f. ballota`, `Quercus ilex f. rotundifolia`, `Quercus ilex subvar. minor`, `Quercus ballota`, `Quercus ilex var. ballota`, `Quercus ilex f. calicina`, `Quercus ilex var. microcarpa`, `Quercus rotundifolia f. calicina`, `Quercus ilex f. macrocarpa`, `Quercus rotundifolia f. brevicupulata`, `Quercus rotundifolia var. macrocarpa`, `Quercus ilex var. brevicupulata`, `Quercus ilex subsp. ballota`, `Quercus ilex var. dolichocalyx`, `Quercus rotundifolia var. pilosella`, `Quercus rotundifolia var. brevicupulata`, `Quercus rotundifolia subsp. maghrebiana`,
    ];
  
    constructor(data?: Partial<Plant>) {
      Object.assign(this, data);
    }
}

export const newPlant = (treflePlant: TreflePlant) => {
    let { 
      id,
      rank,
      slug,
      year,
      links,
      genus,
      author,
      status,
      family,
      genus_id,
      synonyms,
      image_url,
      common_name,
      bibliography,
      scientific_name,
      family_common_name, 
    } = treflePlant;
    
    return new Plant({
      id,
      rank,
      slug,
      genus,
      links,
      family,
      status,
      author,
      genus_id,
      synonyms,
      bibliography,
      scientific_name,
      image: image_url,
      discovered_year: year,
      family_name: family_common_name,
      name: helperFunctions.capitalizeAllWords(common_name != null ? common_name : scientific_name),
    });
}