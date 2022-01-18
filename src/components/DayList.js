import DayListItem from "./DayListItem";
import React from "react";

const DayList = (props) => {
  return (
    <ul>
      {props.days.map((x) => {
        return (
          <DayListItem
            key={x.id}
            {...x}
            setDay={props.setDay}
            selected={x.name === props.day}
          />
        );
      })}
    </ul>
  );
};

export default DayList;
