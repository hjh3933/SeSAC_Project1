const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.sequelize.sync({ force: false }).then((result) => {
    console.log("db연결 성공");
});
// app.use("/static", express.static(__dirname + "/static"));
app.use("/static", express.static(__dirname + "/static"));

const indexRouter = require("./routes");
app.use("/", indexRouter);

// -----------------------------------------------------------------
app.get("*", (req, res) => {
    res.render("404");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
