const express = require("express");
const cors = require("cors");
const path = require("path");
const {mongoose} = require("./database.js");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");

const ALLOWED = "http://localhost:3000";
//initialize
const PORT = process.env.PORT || 8000;
const app = express();
require("./config/passport.js");

//settings
app.set("port", PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  handlebars.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partial"),
    extname: "hbs",
  })
);
app.set("view engine", ".hbs");
//middleware
app.use(
  cors({
    origin: ALLOWED,
  })
);
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// global variables

// esto es para poder mostrar el nombre del usuario
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(require("./routes/index"));
app.use(require("./routes/candidates"));
app.use(require("./routes/users"));

// static file
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")))
// starting server
app.listen(app.get("port"), () => {
  console.log(`app listening on ${app.get("port")}`);
});
