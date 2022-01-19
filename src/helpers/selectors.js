export function getAppointmentsForDay(state, day) {
  return state.days
    .filter((days) => days.name === day)
    .flatMap((day) => day.appointments)
    .map((dayApps) => state.appointments[dayApps]);
}

export function getInterview(state, interview) {
  const newInterview = interview;
  if (!newInterview) {
    return newInterview;
  }
  newInterview.interviewer = state.interviewers[interview.interviewer];
  return newInterview;
}
