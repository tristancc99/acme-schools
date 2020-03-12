import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateSchool = props => {
  let [newName, setNewName] = useState();

  let schoolData = props.schoolData;
  let paramId = props.paramId;

  let currentSchool =
    schoolData &&
    schoolData.find(school => {
      return school.schoolid == paramId.id;
    });

  if (currentSchool && newName == undefined) {
    setNewName(currentSchool.schoolname);
  }

  function handleNameInput(e) {
    setNewName(e.target.value);
  }

  function submitUpdate(e) {
    event.preventDefault();
    props.updateSchool(newName, currentSchool.schoolid);
    alert("School Updated!");
  }

  return (
    <div className="updateContainer">
      <h1>{currentSchool && currentSchool.schoolname}</h1>
      <form>
        <label htmlFor="newName">Update Name</label>
        <input onChange={handleNameInput} name="newName" type="text"></input>
        <button onClick={submitUpdate}>Update</button>
      </form>
      <h2>School ID : {paramId.id}</h2>
    </div>
  );
};

export default UpdateSchool;
