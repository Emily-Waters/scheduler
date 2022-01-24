import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
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
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      setState(() => ({
        ...state,
        appointments: appointments,
      }))
    );
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState(() => ({
          ...state,
          appointments: appointments,
        }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
