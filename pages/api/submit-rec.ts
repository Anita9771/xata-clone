import { NextApiHandler } from "next";
import { XataClient } from "../../utils/xata.codegen";
import dotenv from "dotenv"
dotenv.config();


const xata = new XataClient({apiKey: process.env.NEXT_PUBLIC_XATA_API_KEY});

const handler: NextApiHandler = async (req, res) => {
  const { name, email, reason } = req.body;
  await xata.db.viewers.create({
    name,
    email,
    reason,
  });
  res.end();
  //   console.log(record);
};

export default handler;
