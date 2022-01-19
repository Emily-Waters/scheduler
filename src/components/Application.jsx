import React, { useState, useEffect } from "react";
// External Libraries
import axios from "axios";
// Components
import DayList from "./DayList";
import Appointment from "./Appointment";
// Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
// Styles
import "components/Application.scss";

// Application is the 'home' component that establishes and handles state management, GET's data from the server database used in populating Appointment, Interviewer and Days data
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 3,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
      {
        id: 3,
        time: "2pm",
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Archie Andrews",
          interviewer: {
            id: 4,
            name: "Cohana Roy",
            avatar: "https://i.imgur.com/FK8V841.jpg",
          },
        },
      },
      {
        id: 5,
        time: "4pm",
      },
    ],
    interviewers: [
      {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
      {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
      {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
    ],
  });

  // Handles state management for selecting days on the DayList componenet
  const setDay = (day) => {
    setState((prev) => ({
      ...prev,
      day,
    }));
  };

  // Retrieves data from the server database to populate Appointments, Interviewers and Days
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((res) => {
        const [days, appointments, interviewers] = res;
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .then(() => {});
  }, []);

  // Populates the appointment list for the currently selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (appointments) => {
      return <Appointment key={appointments.id} {...appointments} />;
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
