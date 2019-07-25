const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  photo: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;