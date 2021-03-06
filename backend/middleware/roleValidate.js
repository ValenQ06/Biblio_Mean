import role from "../models/role.js";

const existingRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  req.body.role = roleId._id;
  next();
};

const existingRol = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await role.findOne({ name: req.body.name });
  if (existingName)
    return res.status(400).send({ message: "The role is already registered" });
  next();
};

export default { existingRole, existingRol };
