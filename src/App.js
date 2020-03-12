import React from "react";
import ReactDOM from "react-dom";
import qs from "querystring";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateSchool from "./components/CreateSchool";
import CreateStudent from "./components/CreateStudent";
import UnenrolledList from "./components/UnenrolledList";
import SchoolsList from "./components/SchoolsList";
import UpdateSchool from "./components/UpdateSchool";
import UpdateStudent from "./components/UpdateStudent";

const root = document.querySelector("#root");

const App = () => {
  const [schools, setSchools] = useState();
  const [students, setStudents] = useState();
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));

  //Get students and schools
  useEffect(() => {
    let schools = axios.get("http://localhost:3000/api/schools");
    let students = axios.get("http://localhost:3000/api/students");

    Promise.all([schools, students]).then(function(response) {
      setSchools(response[0].data);
      setStudents(response[1].data);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const { view } = params;

  function createStudent(name, schoolId) {
    if (schoolId == "null") {
      schoolId = null;
    }
    axios
      .post("http://localhost:3000/api/students", {
        studentName: name,
        schoolId: schoolId
      })
      .then(response =>
        setStudents([
          ...students,
          {
            studentname: response.data.studentname,
            studentid: response.data.studentid,
            studentschoolid: response.data.studentschoolid
          }
        ])
      );
  }

  function createSchool(name) {
    axios
      .post("http://localhost:3000/api/schools", {
        schoolName: name
      })
      .then(response =>
        setSchools([
          ...schools,
          {
            schoolid: response.data.schoolid,
            schoolname: response.data.schoolname
          }
        ])
      );
  }

  function updateStudent(name, schoolId, studentId) {
    if (schoolId == "null" || schoolId == undefined) {
      schoolId = null;
    }
    axios
      .put(`http://localhost:3000/api/students/${studentId}`, {
        studentname: name,
        studentschoolid: schoolId,
        studentid: studentId
      })
      .then(response => {
        let updatedStudents = students.filter(student => {
          return student.studentid !== response.data.studentid;
        });
        setStudents([...updatedStudents, response.data]);
      });
  }

  function updateSchool(name, schoolId) {
    axios
      .put(`http://localhost:3000/api/schools/${schoolId}`, {
        schoolname: name,
        schoolid: schoolId
      })
      .then(response => {
        let updatedSchools = schools.filter(school => {
          return school.schoolid !== response.data.schoolid;
        });
        setSchools([...updatedSchools, response.data]);
      });
  }

  return (
    <div>
      <h1>Acme Schools</h1>
      <ul className="nav">
        <li>
          <a href="#view=home">Home</a>
        </li>
      </ul>
      {view === "home" && (
        <div className="container">
          <CreateSchool createSchool={createSchool} />
          <CreateStudent schoolsData={schools} createStudent={createStudent} />
          <UnenrolledList studentData={students} />
          <SchoolsList
            updateStudent={updateStudent}
            schoolsData={schools}
            studentData={students}
          />
        </div>
      )}
      {view === "school" && (
        <UpdateSchool
          updateSchool={updateSchool}
          paramId={params}
          schoolData={schools}
        />
      )}
      {view === "student" && (
        <UpdateStudent
          updateStudent={updateStudent}
          paramId={params}
          studentData={students}
          schoolData={schools}
        />
      )}
    </div>
  );
};

export default App;
