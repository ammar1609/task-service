const express = require("express");
const app = express();
const admin = require("firebase-admin");
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(require('./routes/tasks'));

// Initialize Firebase Admin SDK with service account
const serviceAccount = require("./share-87289-firebase-adminsdk-ep1uj-cbd452e6b8.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://share-87289-default-rtdb.europe-west1.firebasedatabase.app",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});


module.exports = app;

/*
get data from firestore

const test = async () => {
  try {
    const snapshot = await admin.firestore().collection("items").get();
    const documents = snapshot.docs.map((doc) => doc.data());
    console.log(documents);
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};

test();

*/