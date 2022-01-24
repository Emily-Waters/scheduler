import React from "react";
// Components
import DayList from "./DayList";
import Appointment from "./Appointment";
// Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
// Hooks
import useApplicationData from "hooks/useApplicationData";
// Styles
import "components/Application.scss";

// Application is the 'home' component that establishes and handles state management, GET's data from the server database used in populating Appointment, Interviewer and Days data
export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // Populates the appointment list for the currently selected day

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
// export default function Application(props) {
//   const {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   } = useApplicationData();

//   const interviewers = getInterviewersForDay(state, state.day);

//   const appointments = getAppointmentsForDay(state, state.day).map(
//     appointment => {
//       return (
//         <Appointment
//           key={appointment.id}
//           {...appointment}
//           interview={getInterview(state, appointment.interview)}
//           interviewers={interviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
//         />
//       );
//     }
//   );

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         <section className="schedule">
//           {appointments}
//           <Appointment key="last" time="5pm" />
//         </section>
//       </section>
//     </main>
//   );
// }
