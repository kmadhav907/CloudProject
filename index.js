import express from "express";
import bodyParser from "body-parser";
import connectDB from "./databse/config.js";
import Encrpyt from "./model/encrytionModel.js";
import { encryptAlgo } from "./Encryption.js";
import expressAsyncHandler from "express-async-handler";
import Encrypt from "./model/encrytionModel.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

app.get("/", (req, res) => {
  res.render("list", { error: error });
});

var result = "";
var error = "";
app.get("/result", (req, res) => {
  res.render("result", { result: result });
});

app.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const encryptionMessage = req.body.message;
    console.log(encryptionMessage);
    const resultOfEncrypt = encryptAlgo(encryptionMessage);
    const { data, encryptedmessage, decryptionMessage } = resultOfEncrypt;
    const encrpytObject = new Encrypt({
      data,
      encryptedmessage,
      decryptionMessage,
    });

    const createObject = await encrpytObject.save();
    if (createObject) {
      res.redirect("/result");
      result = createObject;
    } else {
      error = "Cant Connect to database";
      res.redirect("/");
    }
  })
);

app.listen(port, () => {
  console.log("Server is running on Port 4000");
});
