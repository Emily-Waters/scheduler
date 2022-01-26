import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { getAllSpots } from "helpers/selectors";

export default function useApplicationData() {
  // Establishing state structure for app

  const initialState = {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  };

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    console.log(action);
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers,
        };
      case SET_INTERVIEW:
        return { ...state, appointments: action.value };
      default:
        return { ...state };
    }
  }

  // Handles state management for selecting days on the DayList component
  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  // Retrieves data from the server database to populate Appointments, Interviewers and Days
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });
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

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }));
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

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
