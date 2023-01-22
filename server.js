//Requirements for any necessary packages, that need initiations

//load express
const express = require("express");
const fs = require("fs");

//create express app
const app = express();

//create template engine
app.engine("hedwig", (filePath, options, callBack) => {
  fs.readFile(filePath, (err, data) => {
    if (err) return callBack(err);
    const rendered = data
      .toString()
      .replace("#title#", `<title>${options.title}</title>`)
      .replace("#message#", `<h1>${options.message}</h1>`)
      .replace(
        "#content#",
        `<a href="http://localhost:3000/${options.content}">"take one down, pass it around"</a>`
      );
    return callBack(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "hedwig");

app.get("/", (request, response) => {
  response.render("template", {
    title: "homework2",
    message: "99 Bottles of beer on the wall",
    content: "98",
  });
});
app.get("/:beer", (request, response) => {
  let num = request.params.beer;
  response.render("template", {
    title: "homework2",
    message: `${num}Bottles of beer on the wall`,
    content: `${num - 1}`,
  });
});

app.get("/", (req, res) => {
  if (num < 0) {
    replace.content(`<a href="http://localhost:3000/">"homepage"</a>`);
    res.redirect("/");
  }
  num--;
});

//Listen on the port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
