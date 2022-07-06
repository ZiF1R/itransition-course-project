"use strict";

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const topicsRoutes = require("./routes/topics.routes");
const collectionsRoutes = require("./routes/collections.routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/collections", collectionsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
