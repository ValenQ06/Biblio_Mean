import user from "../models/user.js";

const existingUser = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingEmail = await user.findOne({ email: req.body.email });
  if (existingEmail)
    return res.status(400).send({ message: "The user is already registered" });
  next();
};

export default { existingUser };
