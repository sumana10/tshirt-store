//DB Connection
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

//middleware
//parse incoming request comes from frontend
const bodyParser = require("body-parser");
//handles headers and populate cookies
const cookieParser = require("cookie-parser");
//
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripRoutes = require("./routes/stripepayment");

//DB Connection

mongoose
  .connect(process.env.DATABASEATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(error => console.log(error));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripRoutes);

//PORT
const port = process.env.PORT || 8880;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
  
});
