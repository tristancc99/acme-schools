const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/schools", async (req, res, next) => {
  try {
    db.getSchools().then(schools => res.send(schools));
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    db.getStudents()
      .then(students => res.send(students))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/schools", async (req, res, next) => {
  try {
    db.createSchool(req.body.schoolName)
      .then(response => res.send(response))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    db.createStudent(req.body.studentName, req.body.schoolId)
      .then(response => res.send(response))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/schools/:id", (req, res, next) => {
  db.deleteSchool(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete("/api/students/:id", (req, res, next) => {
  db.deleteStudent(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.put("/api/students/:id", (req, res, next) => {
  try {
    db.updateStudent(
      req.body.studentname,
      req.body.studentschoolid,
      req.body.studentid
    )
      .then(student => res.send(student))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/schools/:id", (req, res, next) => {
  try {
    db.updateSchool(req.body.schoolname, req.body.schoolid)
      .then(school => res.send(school))
      .catch(next);
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
