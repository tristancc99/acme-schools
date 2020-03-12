import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UnenrolledList = props => {
  let studentData = props.studentData;

  return (
    <div className="unenrolledList">
      <h1>Unenrolled</h1>
      <ul>
        {studentData &&
          studentData.map(student => {
            if (student.studentschoolid == null) {
              return (
                <li key={student.studentid}>
                  <a href={`#view=student&id=${student.studentid}`}>
                    {student.studentname}
                  </a>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default UnenrolledList;
