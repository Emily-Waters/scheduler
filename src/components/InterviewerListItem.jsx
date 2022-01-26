import React from "react";
// Helpers
import classNames from "classnames";
// Styles
import "./InterviewerListItem.scss";

// InterviewerListItem is a component to render and handle behaviour of individual interviewer items. It is used by InterviewerList
const InterviewerListItem = (props) => {
  const interviewerClasses = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected,
  });
  const interviewerImageClasses = classNames("interviewers__item-image", {
    " interviewers__item-image--selected-image": props.selected,
  });
  return (
    <li className={interviewerClasses} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClasses}
        src={props.avatar}
        alt={props.name}
        data-testid="interviewer-img"
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
