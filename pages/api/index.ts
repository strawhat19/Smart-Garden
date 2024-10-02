export default function handler(req: any, res: any) {
  res.status(200).json({ name: `Smart Garden API`, status: `Good` });
}