import React from "react";
// Components
import DayListItem from "./DayListItem";

// Daylist renders a collection of individual day items for selection
const DayList = (props) => {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        selected={day.name === props.day}
      />
    );
  });

  return <ul>{dayList}</ul>;
};

export default DayList;
