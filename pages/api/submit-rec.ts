import { NextApiHandler } from "next";
import { getXataClient } from "../../utils/xata.codegen";

const handler: NextApiHandler = async (req, res) => {
  const xata = await getXataClient();
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
