import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  price: Number,
  imageUrl: String,
  isbn: Number,
  bookStatus: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const book = mongoose.model("books", bookSchema);
export default book;
