import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await book.findOne({ name: req.body.name });
  if (existingName)
    return res.status(400).send({ message: "The book is already registered" });
  next();
};

export default { existingBook };
