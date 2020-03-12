import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateStudent = props => {
  let [newName, setNewName] = useState();
  let [newSchool, setNewSchool] = useState();

  let studentData = props.studentData;
  let schoolData = props.schoolData;
  let paramId = props.paramId;

  //Get current student
  let currentStudent =
    studentData &&
    studentData.find(student => {
      return student.studentid == paramId.id;
    });

  if (newName == undefined && currentStudent) {
    setNewName(currentStudent.studentname);
  }

  //Handle input
  function handleNameInput(e) {
    setNewName(e.target.value || undefined);
  }

  function handleSchoolInput(e) {
    setNewSchool(e.target.value);
  }

  function submitUpdate(e) {
    event.preventDefault();
    props.updateStudent(newName, newSchool, currentStudent.studentid);
    alert("Student Updated!");
  }

  return (
    <div className="updateContainer">
      <h1>{currentStudent && currentStudent.studentname}</h1>
      <form>
        <label htmlFor="newName">Update Name</label>
        <input onChange={handleNameInput} name="newName" type="text"></input>
        <label htmlFor="newSchool">Update School</label>
        <select name="newSchool" onChange={handleSchoolInput}>
          <option value="null">unEnroll</option>
          {schoolData &&
            schoolData.map(school => {
              return (
                <option value={school.schoolid}>{school.schoolname}</option>
              );
            })}
        </select>
        <button onClick={submitUpdate}>Update</button>
      </form>
      <h2>Student ID : {paramId.id}</h2>
    </div>
  );
};

export default UpdateStudent;
