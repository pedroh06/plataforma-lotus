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

  if (req.method === "POST") {
    const black_sheet = await db.Blank_Sheet.upsert({
      where: {
        id: id,
      },
      create: {
        ...req.body,
      },
      update: {
        ...req.body,
      },
    });

    res.status(201).json(black_sheet);
  }

  if (req.method === "GET") {
    // Process a GET request
    console.log(id);
    const black_sheet = await db.Blank_Sheet.findUnique({
      where: {
        id: id,
      },
    });

    console.log("black_sheet =>>>>>>>>>", black_sheet);

    res.status(200).json(black_sheet);
  }
}
