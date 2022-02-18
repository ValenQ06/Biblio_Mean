import book from "../models/book.js";

const registerbook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.author ||
    !req.body.price ||
    !req.body.imageUrl ||
    !req.body.bookStatus
  )
    return res.status(400).send({ message: "Incomplete data" });

  let schema = new book({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    bookStatus: req.body.bookStatus,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });
  res.status(200).send({ result });
};

const listBooks = async (req, res) => {
  let books = await book
    .find({ name: new RegExp(req.params["name"]) })
    .exec();
  return books.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ books });
};

export default { registerbook, listBooks };
