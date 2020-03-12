import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SchoolsList = props => {
  let schoolsData = props.schoolsData;
  let studentData = props.studentData;
  const updateStudent = props.updateStudent;

  function handleSelect(e) {
    if (e.target.value !== "none") {
      let schoolId = e.target.getAttribute("data-id");
      let studentId = e.target.value;
      let name = studentData.find(student => {
        return student.studentid == studentId;
      });
      updateStudent(name.studentname, schoolId, name.studentid);
    }
  }

  function handleClick(e) {
    let name = studentData.find(student => {
      return student.studentid == e.target.value;
    });
    updateStudent(name.studentname, null, name.studentid);
  }

  return (
    <div className="schoolList">
      {schoolsData &&
        schoolsData.map(school => {
          return (
            <div className="schoolItem">
              <h1>
                <a href={`#view=school&id=${school.schoolid}`}>
                  {school.schoolname}
                </a>
              </h1>
              <form>
                <select data-id={school.schoolid} onChange={handleSelect}>
                  <option value="none">Enroll a Student</option>
                  {studentData &&
                    studentData.map(student => {
                      if (student.studentschoolid == null) {
                        return (
                          <option
                            id={school.schoolid}
                            value={student.studentid}
                          >
                            {student.studentname}
                          </option>
                        );
                      }
                    })}
                </select>
              </form>
              <ul>
                {studentData &&
                  studentData.map(student => {
                    if (student.studentschoolid == school.schoolid) {
                      return (
                        <li key={student.studentid + 1}>
                          <a href={`#view=student&id=${student.studentid}`}>
                            {student.studentname}
                          </a>
                          &nbsp;
                          <button
                            value={student.studentid}
                            onClick={handleClick}
                          >
                            unEnroll
                          </button>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default SchoolsList;
