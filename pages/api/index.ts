export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: `Good`, 
    name: `Smart Garden API`, 
    endpoints: [
      `/api/plants`,
    ]
  });
}