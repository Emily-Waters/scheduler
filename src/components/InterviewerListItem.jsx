import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

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
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
