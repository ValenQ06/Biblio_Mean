import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingCode = await book.findOne({ isbn: req.body.isbn });
  if (existingCode)
    return res.status(400).send({ message: "The isbn is already registered" });
  next();
};

export default { existingBook };
