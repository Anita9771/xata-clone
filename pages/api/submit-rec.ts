import { NextApiHandler } from "next";
import { XataClient } from "../../utils/xata.codegen";
import dotenv from "dotenv"
// dotenv.config();




const handler: NextApiHandler = async (req, res) => {
  const xata = new XataClient({apiKey: "xau_uzhMDDgbL6E223PELWfvZjTr5nkVEfvq2"});
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
