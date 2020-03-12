const pg = require("pg");
const { v4: uuidv4 } = require("uuid");
const { Client } = pg;

const client = new Client("postgres://localhost/acme_schools_db");

client.connect();

const sync = async () => {
  const SQL = `
    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS schools;

    CREATE TABLE schools(
        schoolId UUID PRIMARY KEY,
        schoolName varchar(50) UNIQUE NOT NULL
    );

    CREATE TABLE students(
        studentId UUID PRIMARY KEY,
        studentName varchar(50) NOT NULL,
        studentSchoolId UUID REFERENCES schools(schoolId) DEFAULT NULL
    );

    INSERT INTO schools(schoolId, schoolName) values('${uuidv4()}', 'UNF' )
    `;
  return await client.query(SQL);
};

const getSchools = async () => {
  try {
    const SQL = `SELECT * FROM schools;`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (err) {
    console.log(err);
  }
};

const getStudents = async () => {
  try {
    const SQL = `SELECT * FROM students;`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (err) {
    console.log(err);
  }
};

const createSchool = async schoolName => {
  try {
    const SQL = `INSERT INTO schools(schoolId, schoolName) VALUES($1, $2) RETURNING *;`;
    const response = await client.query(SQL, [uuidv4(), schoolName]);
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const createStudent = async (studentName, schoolId) => {
  try {
    const SQL = `INSERT INTO students(studentId, studentName, studentSchoolId) VALUES($1, $2, $3) RETURNING *;`;
    const response = await client.query(SQL, [uuidv4(), studentName, schoolId]);
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const deleteSchool = async id => {
  try {
    const SQL = "DELETE FROM schools WHERE id = $1";
    const response = await client.query(SQL, [id]);
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async id => {
  try {
    const SQL = "DELETE FROM students WHERE id = $1";
    const response = await client.query(SQL, [id]);
  } catch (err) {
    console.log(err);
  }
};

const updateSchool = async (name, id) => {
  try {
    const SQL =
      "UPDATE schools SET schoolName = $1 where schoolId = $2 RETURNING *";
    const response = await client.query(SQL, [name, id]);
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const updateStudent = async (studentName, studentSchoolId, studentId) => {
  try {
    const SQL =
      "UPDATE students SET studentName = $1, studentSchoolId = $2 WHERE studentId = $3 RETURNING *";
    const response = await client.query(SQL, [
      studentName,
      studentSchoolId || null,
      studentId
    ]);
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sync,
  getSchools,
  getStudents,
  createSchool,
  createStudent,
  deleteSchool,
  deleteStudent,
  updateSchool,
  updateStudent
};
