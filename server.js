"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
// app.use("/api", );

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
