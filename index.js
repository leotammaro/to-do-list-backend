require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const password = require("./passwords");
const handleErrors = require("./middlewares/handleErrors");
const Task = require("./models/Task.js");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin.json");
const { verifyToken } = require("./middlewares/verifyToken");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());

app.use(verifyToken);

app.get("/tasks", (req, res) => {
  const { uid } = res.locals;
  Task.find({ uidUser: uid })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => console.log(err));
});

app.delete("/task", (req, res) => {
  const { _id } = req.body;
  Task.findByIdAndDelete(_id)
    .then((response) => res.json(response).sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post("/tasks", (req, res) => {
  const { content, status } = req.body;
  const { uid } = res.locals;
  const newTask = new Task({
    content,
    status,
    uidUser: uid,
  });
  newTask
    .save()
    .then((response) => res.json(response).sendStatus(200))
    .catch((err) => console.log(err));
});

app.put("/task", (req, res) => {
  const { content, status, _id } = req.body;

  Task.findByIdAndUpdate(
    _id,
    {
      ...(content && { content }),
      ...(status && { status }),
    },
    { new: true }
  )
    .then((response) => res.json(response).sendStatus(200))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
