export function getAppointmentsForDay(state, day) {
  return state.days
    .filter((days) => days.name === day) // Filters day array returning days matching day arg
    .flatMap((day) => day.appointments) // Seperates appointment ids in filtered day array into a new array
    .map((dayApps) => state.appointments[dayApps]); // Maps a new array of appointments by appointment id
}

export function getInterview(state, interview) {
  return !interview
    ? interview
    : {
        ...interview,
        interviewer: state.interviewers[interview.interviewer],
      };
}

export function getInterviewersForDay(state, day) {
  return state.days
    .filter((days) => days.name === day) // Filters day array returning days matching day arg
    .flatMap((day) => day.interviewers) // Maps interviewer ids into new flattened array
    .map((interviewer) => state.interviewers[interviewer]); // Maps new array of interviewer objects matching provided ids
}

export function getAllSpots(state) {
  // Creates a new array of Appointment objects, filters out appointments with an interview, and then get's the length of the remaining array which indicates how many spots in total for the week remain available. This is used by the state.spots variable to indicate a change in appointments booked which shoots off a request to the server to update the data.
  return Object.values(state.appointments).filter(
    (appointment) => !appointment.interview
  ).length;
}
