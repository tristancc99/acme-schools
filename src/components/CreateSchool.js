import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CreateSchool = props => {
  const createSchool = props.createSchool;

  const [nameInput, setNameInput] = useState();

  function handleCreate(e) {
    event.preventDefault();
    createSchool(nameInput);
  }

  function handleInput(e) {
    setNameInput(e.target.value);
  }

  return (
    <div className="createForm">
      <h1>Create School</h1>
      <form>
        <label htmlFor="name">School Name:</label>
        <br />
        <input onChange={handleInput} name="name" type="text"></input>

        <button onClick={handleCreate}>Create School</button>
      </form>
    </div>
  );
};

export default CreateSchool;
