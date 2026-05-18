const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");
const path = require("path");

const db = require("./config/db");
// Connect to DB
db.connect();

const app = express();
const port = 3000;
app.use(express.static("src/public"));
app.use(express.static(path.join(__dirname, "public")));
// HTTP logger
// app.use(morgan("combined"));
// Cài session dùng 1 lần
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/DongHo_dev",
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());
// chuyển đổi sesssion sang locals
app.use((req, res, next) => {
  res.locals.message = req.flash("message")[0];
  res.locals.type = req.flash("type")[0];
  res.locals.user = req.session.user || null;
  next();
});

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      eq: (a, b) => a === b,
       ifCond: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
    },
  }),
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const route = require("./routes");
// Khởi tạo route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
