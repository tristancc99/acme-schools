import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CreateStudent = props => {
  const schoolsData = props.schoolsData;
  const createStudent = props.createStudent;

  const [nameInput, setNameInput] = useState();
  const [schoolInput, setSchoolInput] = useState();

  function handleCreate(e) {
    event.preventDefault();
    console.log(nameInput, schoolInput);
    createStudent(nameInput, schoolInput);
  }

  function handleInput(e) {
    setNameInput(e.target.value);
  }

  function handleSelect(e) {
    setSchoolInput(e.target.value);
  }

  return (
    <div className="createForm">
      <h1>Create Student</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input onChange={handleInput} name="name" type="text"></input>
        <label htmlFor="selectSchool">Select School:</label>
        <br />
        <select onChange={handleSelect} className="selectSchools">
          <option value={"null"}>unEnrolled</option>
          {schoolsData &&
            schoolsData.map(school => {
              return (
                <option key={school.schoolid + 1} value={school.schoolid}>
                  {school.schoolname}
                </option>
              );
            })}
        </select>
        <button onClick={handleCreate}>Create Student</button>
      </form>
    </div>
  );
};

export default CreateStudent;
