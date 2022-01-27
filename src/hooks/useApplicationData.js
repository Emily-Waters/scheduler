import axios from "axios";
import { useEffect, useReducer } from "react";

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
        return {
          ...state,
          appointments: action.value.appointments,
          days: action.value.days,
        };

      default:
        return { ...state };
    }
  }

  // Handles state management for selecting days on the DayList component
  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  // Websocket
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = function (event) {
      webSocket.send("ping");
    };

    webSocket.onmessage = function (event) {
      const parsed = JSON.parse(event.data);
      console.log(parsed);
      if (parsed.type === SET_INTERVIEW && parsed.interview) {
        // const appointment = {
        //   ...state.appointments[parsed.id],
        //   interview: { ...parsed.interview },
        // };
        // const appointments = {
        //   ...state.appointments,
        //   [parsed.id]: appointment,
        // };
        // const days = updateSpots(state, appointments, parsed.id);
        // dispatch({
        //   type: SET_INTERVIEW,
        //   value: { appointments: appointments, days: days },
        // });
        // bookInterview(parsed.id, parsed.interview);
      }

      if (parsed.type === SET_INTERVIEW && !parsed.interview) {
        // const appointment = {
        //   ...state.appointments[parsed.id],
        //   interview: { ...parsed.interview },
        // };
        // const appointments = {
        //   ...state.appointments,
        //   [parsed.id]: appointment,
        // };
        // const days = updateSpots(state, appointments, parsed.id);
        // dispatch({
        //   type: SET_INTERVIEW,
        //   value: { appointments: appointments, days: days },
        // });
        // cancelInterview(parsed.id, parsed.interview);
      }
      return () => {
        webSocket.close();
      };
    };
  });

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
    const days = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        value: { appointments: appointments, days: days },
      })
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

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        value: { appointments: appointments, days: days },
      })
    );
  }

  const updateSpots = function (state, appointments, id) {
    const { ...day } = state.days.find((day) => day.name === state.day);
    const spots = day.appointments
      .map((id) => appointments[id])
      .filter((appointment) => !appointment.interview).length;
    day.spots = spots;
    const index = state.days.findIndex((day) => day.name === state.day);
    const days = { ...state.days, [index]: day };
    return Object.values(days);
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
