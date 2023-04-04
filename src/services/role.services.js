import db from "../database/models/index.js";

export const setRole = async (req, res) => {
  const { email, role } = req.body; // get email and role from request body

  if (!email) {
    return res.status(400).send("Missing email parameter");
  }
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send(`${email} is not found`);
  }
  user.roleId = role;
  await user.save();
  return res.status(200).send(user);
};

export default setRole;
