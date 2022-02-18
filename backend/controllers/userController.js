import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.cellNumber || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    cellNumber: req.body.cellNumber,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
  return res.status(400).send({ message: "Wrong email or password" });

  if(!userLogin.dbStatus)
  return res.status(400).send({ message: "User not found" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "email or password" });

    try {
      return res.status(200).json({
        token: jwt.sign(
          {
            _id: userLogin._id,
            name: userLogin.name,
            role: userLogin.role,
            iat: moment().unix(),
          },
          process.env.SK_JWT
        ),
      });
    } catch (e) {
      return res.status(500).send({ message: "Login error" });
    }
};

export default { registerUser, listUser, login };
