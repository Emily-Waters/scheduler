import React from "react";
// Helpers
import classNames from "classnames";
// Styles
import "components/DayListItem.scss";

// DayListItem is a component that handles behaviour for individual days. DayListItem is used by DayList
export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const dayClass = classNames("day-list__item", {
    " day-list__item--full": spots === 0,
    " day-list__item--selected": selected,
  });
  const formatSpots = (spots) => {
    return !spots
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : spots + " spots remaining";
  };

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
