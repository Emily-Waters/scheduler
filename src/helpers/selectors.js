export default function getAppointmentsForDay(state, day) {
  return state.days
    .filter((days) => days.name === day)
    .flatMap((day) => day.appointments)
    .map((dayApps) => state.appointments[dayApps]);
}
