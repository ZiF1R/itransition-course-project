"use strict";

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const topicsRoutes = require("./routes/topics.routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/topics", topicsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
