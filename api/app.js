//? Dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
// require('dotenv').config()

//! Files
require("./src/database/database");
const routerModels = require("./src/routes/models.router");

//? Initial Configs
const app = express();
const PORT = process.env.PORT || 8000;

//! Enable Cors
const whitelist = ["http://localhost:8000", "http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Denied By CORS"));
    }
  },
};

app.use(cors());
// app.use(morgan("dev"))

if (process.env.NODE_ENV === "production") {
  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
      https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200
  */
  app.use(helmet({ crossOriginResourcePolicy: false }));
}
//! Accept Json & form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! Authenticate DB

//serve static html
// app.use('/', express.static('../client/dist/'))
app.use(express.static(path.join(__dirname, "../client/dist/")));

//! Routes
routerModels(app);
// app.use(errorHandler)
/* 
  Tell everyone the state of your api
  */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server active on PORT: ${PORT} 🚀`);
});
