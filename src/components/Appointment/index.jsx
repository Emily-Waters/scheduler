import React from "react";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import "./styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time ? "Appointment at " + props.time : "No Appointments"}
    </article>
  );
}
