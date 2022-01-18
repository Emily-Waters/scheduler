import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = (props) => {
  const [interviewer, setInterviewer] = useState();
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((x) => {
          return (
            <InterviewerListItem
              key={x.id}
              {...x}
              setInterviewer={setInterviewer}
              selected={interviewer === x.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;

// Our InterviewerList receives three props:

// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
// interviewer:number - a number that represents the id of the currently selected interviewer
