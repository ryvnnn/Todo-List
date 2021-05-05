
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const _ = require('lodash');

mongoose.connect('mongodb+srv://admin_ryan:test123@cluster0.wpmsc.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));


// start with database things
// create schema for each database document (document is like a row)
const itemSchema = new mongoose.Schema({
  name: String
});

// create new collection (this is like a table)
const Item = new mongoose.model('Item', itemSchema);

// create new content 
const item1 = new Item ({
  name: 'welcome'
});
const item2 = new Item ({
  name: 'hit +'
});
const item3 = new Item ({
  name: 'delete here'
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = new mongoose.model('List', listSchema);

// Item.deleteMany({name:'welcome'});


// on home page
app.get("/", function(req, res) {
  // look at all the items in the table
  Item.find({}, function(err, foundItems){
    // if there are no items
    if (foundItems.length === 0){
      // insert the default items 
      Item.insertMany(defaultItems, function (err){
        if (err) {
          console.log('error');
        } else {
          console.log('success');
        }
      });      
      res.redirect('/');
    } else {
    // if there are items, then just render the existing list
    res.render("list", {listTitle: 'Today', newListItems: foundItems});      
    }
  });
});

// when user clicks/submit on the home button 
app.post("/", function(req, res){
  // get the itemNam
  const itemName = req.body.newItem;
  const listName = req.body.list;
  
  const item = new Item({
    name: itemName
  });
  
  if (listName === "Today") {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({name:listName}, function(err, foundList) {
      console.log(foundList);
        foundList.items.push(item);
        foundList.save();
        res.redirect('/'+ listName);
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  console.log(listName);

  if (listName === 'Today'){
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err){  
        console.log('success deleted1');
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate({name:listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect('/' + listName);
      }
      
      // foundItems.findByIdAndRemove(checkedItemId, function(err){
      //   if (!err){  
      //     console.log('success deleted2');
      //     res.redirect("/"+listName);
      //   }
      // })
    })
  }
});

app.get("/:post", function(req, res){
  const listName =  _.capitalize(req.params.post);
  List.findOne({name: listName}, function(err, foundList){
  if (!err) {
      if (!foundList) {
        const list = new List({
          name: listName,
          items: defaultItems
        });
        console.log('2');
        list.save();
        res.redirect("/" + listName);
       
      }else {
        console.log('1');
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        console.log('4');
    } 
    }
  })
});


app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
