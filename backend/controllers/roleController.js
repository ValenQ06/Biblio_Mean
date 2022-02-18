//Creacion de los controladores - son mis funciones, acciones del codigo
import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const listrole = async (req, res) => {
  let roles = await role.find();
  return roles.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ roles });
};

export default { registerRole, listrole };
