const Article = require("./Article");
const Note = require("./Note");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio")

mongoose.connect("mongodb://localhost/scraper", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

const models = {
  homePage: (req,res) => {
    res.render("index")
  },

  savedArticle: async (req, res) => {
    try {
      let articles = await Article.find()
      console.log("Articles that were saved" + articles)
      res.render("saved", {articles})
    } catch (e) {
      console.log(e)
    }
    
  },

  scrapeArticles: (req, res) => {
    let articles = [];
    let DOMId = 0;
    axios.get("https://news.berkeley.edu/category/campuscommunity/events_at_berkeley/").then(function(response) {
            
            let $ = cheerio.load(response.data)
        
            $("article").each(function(index, element) {

                let result = {};

                result.title = $(this).find("h3").text().replace("\n", " ").trim();
                result.link = $(this).find("a").attr("href");
                result.summary = $(this).find("img").attr("alt");
                result.imageSrc = $(this).find("img").attr("src");
                result.DOMId = DOMId;
                // console.log(result);
                articles.push(result);
                DOMId++
            })
        }).then(() => {
          res.render("index", {articles})
        });
    },

  saveArticle: (req, res) => {
    console.log("saveArticle was hit")
    Article.create(req.body).then(res2 => {
      console.log("Added to database, check")
    }).catch(e => {
      console.log(e)
    })
  },

  saveNote: async (req, res) => {
    console.log("saveNote models was hit")
    try {
      const newNote = await Note.create(req.body)
      // console.log("newNote"+newNote);
      // console.log("req title coming in" + req.body.title);
      const article = await Article.findOneAndUpdate({title : req.body.title}, {$push:{note: newNote._id}}, {new:true});
      console.log(article);
      res.json(article);
    } catch (e) {
      res.json(e);
    }
  },

  checkNote: async (req, res) => {
    try {
      const article = await Article.findOne({title : req.body.title}).populate("note");
      // console.log("Article from get request backend "+ article)
      res.json(article)
    } catch (e) {
      res.json(e)
    }
  }
}


module.exports = {models};