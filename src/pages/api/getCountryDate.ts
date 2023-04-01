import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { lat, long } = JSON.parse(req.body);
    const fetchDate = await fetch(
      `https://www.timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${long}`
    );
    const unformattedDate = await fetchDate.json();
    const formattedDate = unformattedDate.dateTime;

    res.status(200).json({ data: formattedDate });
  }
}
