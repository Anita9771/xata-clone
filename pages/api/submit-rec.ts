import { NextApiHandler } from "next";
import { XataClient, getXataClient } from "../../utils/xata.codegen";
import dotenv from "dotenv";
dotenv.config();

// connecting to xata
const handler: NextApiHandler = async (req, res) => {
  const xata = new XataClient({ apiKey: process.env.apiKey });
  const { name, email, reason } = req.body;
  await xata.db.viewers.create({
    name,
    email,
    reason,
  });
  res.end();
};

export default handler;
