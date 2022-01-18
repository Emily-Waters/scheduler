import DayListItem from "./DayListItem";
import React from "react";

const DayList = (props) => {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        selected={day.name === props.value}
      />
    );
  });

  return <ul>{dayList}</ul>;
};

export default DayList;
