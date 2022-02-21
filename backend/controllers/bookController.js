import book from "../models/book.js";

const registerbook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.author ||
    !req.body.price ||
    !req.body.imageUrl ||
    !req.body.isbn ||
    !req.body.bookStatus
  )
    return res.status(400).send({ message: "Incomplete data" });

  let schema = new book({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    isbn: req.body.isbn,
    bookStatus: req.body.bookStatus,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });
  res.status(200).send({ result });
};

const listBooksAdmin = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) }).exec();
  return books.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ books });
};

const listBooks = async (req, res) => {
  let books = await book
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .exec();
  return books.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ books });
};

const deleteBook = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const books = await book.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !books
    ? res.status(400).send({ message: "Error deleting book" })
    : res.status(200).send({ message: "Book deleted" });
};

const updateBookAdmin = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.description ||
    !req.body.author ||
    !req.body.price ||
    !req.body.imageUrl ||
    !req.body.bookStatus
  )
    return res.status(400).send({ message: "Incomplete data" });

  const editBook = await book.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    bookStatus: req.body.bookStatus,
  });
  if (!editBook) return res.status(500).send({ message: "Error editing book" });
  return res.status(200).send({ message: "Book Updated" });
};

export default {
  registerbook,
  listBooks,
  deleteBook,
  updateBookAdmin,
  listBooksAdmin,
};
