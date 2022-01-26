import React from "react";
// Helpers
import classNames from "classnames";
// Styles
import "components/DayListItem.scss";

// DayListItem is a component that handles behaviour for individual days. DayListItem is used by DayList
export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    " day-list__item--full": props.spots === 0,
    " day-list__item--selected": props.selected,
  });
  const formatSpots = (spots) => {
    return !spots
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : spots + " spots remaining";
  };
  const handleClick = () => {
    props.setDay(props.name);
  };
  return (
    <li
      className={dayClass}
      onClick={handleClick}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
