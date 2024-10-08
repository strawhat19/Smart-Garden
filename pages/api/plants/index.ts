import { newPlant, TreflePlant } from "../../../shared/types/plants";

export default async function handler(req: any, res: any) {
    console.log(`Token`, process.env.NEXT_PUBLIC_TREFLE_API_TOKEN);
    const plantsURL = `https://trefle.io/api/v1/plants?token=${process.env.NEXT_PUBLIC_TREFLE_API_TOKEN}`;
    try {
        const plantsResponse = await fetch(plantsURL);
        const plantsJSON = await plantsResponse.json();
        let plantsData = plantsJSON?.data && plantsJSON?.data.length > 0 ? plantsJSON?.data?.map((treflePlant: TreflePlant) => newPlant(treflePlant)) : [];
        res.status(200).json(plantsData);
    } catch (error) {
        res.status(500).json(error);
    }
}