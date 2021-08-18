const express = require("express");
const path = require("path");
const crypto = require("crypto");
const twig = require("twig");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const generateKey = (param) => {
  let value = parseInt(param);
  return crypto.randomBytes(value).toString("hex");
};

app.get("/", (req, res) => {
  res.render("home/index.html.twig");
});

app.post("/api/keyHex", (req, res) => {
  const digit = req.body.digit;
  const key = generateKey(digit);
  res.status(200).json({ meassage: "ok", keygen: key });
});

app.listen(5000);
