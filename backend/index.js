const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(3000);
