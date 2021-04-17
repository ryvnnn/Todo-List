const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // whenever requiring a personally made module, must add the dirname and the slash to let comp know that it is a local file.

const app = express();

const inputs = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs"); // needed to start ejs'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // needed for adding css. this tells express that it should go in the public foloder

app.get("/", function (req, res) {
  const day = date.getDate();

  // what is render used for? it is used to put data into the html. This is telling the page to render the 'list' with the list title as the current day with the inputs as the newListItems
  res.render("list", { listTitle: day, newListItems: inputs });
  //   res.render("list", { date: currentDay });
});

app.post("/", function (req, res) {
  //use REQ for whenever you need to call from page
  // use RES whenever you need to send to page
  const input = req.body.nextItem;
  if (req.body.lister === "Work") {
    workItems.push(input);
    console.log(req);
    console.log(req.body);
    res.redirect("/work");
  } else {
    inputs.push(input);
    res.redirect("/");
  }
});

// This is for if there is a work path. So anytime you create a new path, you have to create a new get and post? i guess so
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const input = req.body.nextItem;
  workItems.push(input);
  console.log(req.body);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("server running on port 3000");
});
