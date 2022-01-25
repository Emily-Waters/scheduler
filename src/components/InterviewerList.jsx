import React from "react";
// Components
import InterviewerListItem from "./InterviewerListItem";
// Styles
import "./InterviewerList.scss";
// Prop typeof check
import PropTypes from "prop-types";
// InterviewerList is a component to display a list of available interviewers for selection on the Form component
const InterviewerList = (props) => {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
