// THIS IS A MODULE FOR THE NORMAL APP.JS

// setting module.exports to something allows you to use it in another file. The other file should require this module.
// You can use a function but try not to use parentheses here because this is just a module and you do not want to call it.
// If you want to call the function, you should do it in the actually place where this is required/used. So in our case, call it in app.js

exports.getDate = function () {
  // this outputs the result to the list (which is list.ejs) and then the new variable kindOfDay is set to the current value of day. kindOfDay is then the variable that is passed into the HTML that will be seen by users

  const today = new Date(); //create today

  const options = {
    //used to make the date
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options); // pass in locale for how we want the date to look, pass in options to format the data string
};

exports.getDay = function () {
  // this outputs the result to the list (which is list.ejs) and then the new variable kindOfDay is set to the current value of day. kindOfDay is then the variable that is passed into the HTML that will be seen by users

  const today = new Date(); //create today

  const options = {
    //used to make the date
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options); // pass in locale for how we want the date to look, pass in options to format the data string
};

console.log(module.exports);
