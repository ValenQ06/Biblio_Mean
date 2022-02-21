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

const listroleAdmin = async (req, res) => {
  let roles = await role.find();
  return roles.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ roles });
};

const listrole = async (req, res) => {
  let roles = await role
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .exec();
  return roles.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ roles });
};

const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const roles = await role.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !roles
    ? res.status(400).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "Role deleted" });
};

const updateRoleAdmin = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

    const editRole = await role.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description,
    });
    if (!editRole) return res.status(500).send({ message: "Error editing role" });
    return res.status(200).send({ message: "Role Updated" });
  };

export default { registerRole, listrole, deleteRole, updateRoleAdmin, listroleAdmin };
