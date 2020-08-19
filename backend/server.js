require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect database
const uri = process.env.ATLAS_URI;
//const uri = "mongodb://localhost:27017/exerciseDB";
mongoose.connect(uri, {useNewUrlParser:true, useFindAndModify: true, useUnifiedTopology:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB database connection established succesfully"));
//

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`))