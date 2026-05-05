const express = require("express");

const morgan = require("morgan");
const dotenv = require("dotenv"); // if the file name is only => .env
dotenv.config({ path: "./config.env" }); // should be add as the file name is 'config.env'

// ********** import DB start******* //
const dbConnection = require("./config/database");
// ********** import DB End******* //

// ********** import Routes start**********//
const categoryRoute = require("./routes/categoryRoute");
// ********** import Routes End**********//

// express app
const app = express();
// express app
dbConnection();
//********* middelwares start********** *//
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("mode : ", process.env.NODE_ENV);
}
//********* middelwares end********** *//

//********* Mount Routes Start***********//
app.use("/api/v1/categories", categoryRoute);
//********* Mount Routes End***********//

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("app running on port : ", PORT);
});
