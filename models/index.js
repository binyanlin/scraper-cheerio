const Article = require("./Article");
const Note = require("./Note");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio")

mongoose.connect("mongodb://localhost/scraper", {useNewUrlParser: true});

const models = {
  homePage: (req,res) => {
    res.render("index")
  },
  savedArticle: (req, res) => {
    res.render("saved")
  },
  showArticles: async (req, res) => {
    try {
      let articles = await Article.find()
      res.render("index", {articles});
    } catch(e) {
      console.log(e)
    }
  },
  scrapeArticles: (req, res) => {
    let articles = [];
    axios.get("https://news.berkeley.edu/category/campuscommunity/events_at_berkeley/").then(function(response) {
            
            let $ = cheerio.load(response.data)
        
            $("article").each(function(index, element) {

                let result = {};

                result.title = $(this).find("h3").text().replace("\n", " ").trim();
                result.link = $(this).find("a").attr("href");
                result.summary = $(this).find("img").attr("alt");
                result.photo = $(this).find("img").attr("src");

                // console.log(result);
                articles.push(result);
            })
        }).then(() => {
          res.render("index", {articles})
        });
    },
  saveArticle: (req, res) => {
    let id = req.params.id;
    
  }

  }


module.exports = {models};