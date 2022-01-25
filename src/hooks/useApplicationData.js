import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  // Establishing state structure for app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  // Handles state management for selecting days on the DayList component
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

  // Books interviews by creating a new interview object attached to an appointment selected by id, then replaces the exisiting interview in the appointments list (by id), makes a put request to the server to store the data
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
      interview: interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState(() => ({
        ...state,
        appointments: appointments,
      }));
    });
  }

  function updateSpots() {}

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  };
}
