import React from "react";
// Components
import DayListItem from "./DayListItem";

// Daylist renders a collection of individual day items for selection
const DayList = (props) => {
  const { days, value, setDay } = props;
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={setDay}
        selected={day.name === value}
      />
    );
  });

  return <ul>{dayList}</ul>;
};

export default DayList;
