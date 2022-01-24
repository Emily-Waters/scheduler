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
