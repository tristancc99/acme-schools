import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateSchool from "./components/CreateSchool";
import CreateStudent from "./components/CreateStudent";

const root = document.querySelector("#root");

const App = () => {
  //Get students and schools
  useEffect(() => {
    let schools = axios.get("http://localhost:3000/api/schools");
    let students = axios.get("http://localhost:3000/api/students");

    Promise.all([schools, students]).then(function(response) {
      console.log(response);
    });
  }, []);

  function testPost() {
    axios
      .post("http://localhost:3000/api/students", {
        studentName: "John",
        schoolId: null
      })
      .then(response => console.log(response));
  }

  return (
    <div>
      <h1>Acme Schools</h1>
      <button onClick={testPost}>TEST</button>
      <CreateSchool />
      <CreateStudent />
    </div>
  );
};

export default App;
