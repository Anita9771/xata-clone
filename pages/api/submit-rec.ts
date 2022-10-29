import { NextApiHandler } from "next";
import { XataClient, getXataClient } from "../../utils/xata.codegen";
import dotenv from "dotenv"
// dotenv.config();




const handler: NextApiHandler = async (req, res) => {
  // const xata = await getXataClient();
  const xata = new XataClient({apiKey: process.env.XATA_API_KEY});
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
