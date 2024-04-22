/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).send("Missing id");
  }

  if (req.method === "GET") {
    // Process a GET request
    const user = await db.resident.findUnique({
      where: {
        id: id,
      },
      include: {
        Nutritional_Form_GAIA_1: true,
        Dental_Anamnesis_GAIA_1: true,
        Medical_Anamnesis_GAIA_1: true,
        Medical_Care_GAIA_1: true,
        Blank_Sheet: true,
      },
    });

    res.status(200).send(user);
  }
}
