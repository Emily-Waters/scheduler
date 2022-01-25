import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

const state = {
  day: "Monday",
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3, 4, 5],
      interviewers: [1, 4, 5, 8, 9],
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [6, 7, 8, 9, 10],
      interviewers: [1, 2, 6, 9, 10],
      spots: 4,
    },
    {
      id: 3,
      name: "Wednesday",
      appointments: [11, 12, 13, 14, 15],
      interviewers: [3, 4, 5, 6, 9],
      spots: 4,
    },
    {
      id: 4,
      name: "Thursday",
      appointments: [16, 17, 18, 19, 20],
      interviewers: [2, 3, 4, 6, 7],
      spots: 1,
    },
    {
      id: 5,
      name: "Friday",
      appointments: [21, 22, 23, 24, 25],
      interviewers: [2, 4, 5, 6, 9],
      spots: 4,
    },
  ],
  appointments: {
    1: {
      id: 1,
      time: "12pm",
      interview: {
        student: "Archie Cohen",
        interviewer: 8,
      },
    },
    2: {
      id: 2,
      time: "1pm",
      interview: null,
    },
    3: {
      id: 3,
      time: "2pm",
      interview: {
        student: "Chad Takahashi",
        interviewer: 1,
      },
    },
    4: {
      id: 4,
      time: "3pm",
      interview: null,
    },
    5: {
      id: 5,
      time: "4pm",
      interview: {
        student: "Jamal Jordan",
        interviewer: 8,
      },
    },
    6: {
      id: 6,
      time: "12pm",
      interview: null,
    },
    7: {
      id: 7,
      time: "1pm",
      interview: null,
    },
    8: {
      id: 8,
      time: "2pm",
      interview: null,
    },
    9: {
      id: 9,
      time: "3pm",
      interview: {
        student: "Leopold Silvers",
        interviewer: 2,
      },
    },
    10: {
      id: 10,
      time: "4pm",
      interview: null,
    },
    11: {
      id: 11,
      time: "12pm",
      interview: null,
    },
    12: {
      id: 12,
      time: "1pm",
      interview: {
        student: "Liam Martinez",
        interviewer: 6,
      },
    },
    13: {
      id: 13,
      time: "2pm",
      interview: null,
    },
    14: {
      id: 14,
      time: "3pm",
      interview: null,
    },
    15: {
      id: 15,
      time: "4pm",
      interview: null,
    },
    16: {
      id: 16,
      time: "12pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: 2,
      },
    },
    17: {
      id: 17,
      time: "1pm",
      interview: {
        student: "Maria Boucher",
        interviewer: 7,
      },
    },
    18: {
      id: 18,
      time: "2pm",
      interview: {
        student: "Michael Chan-Montoya",
        interviewer: 2,
      },
    },
    19: {
      id: 19,
      time: "3pm",
      interview: {
        student: "Richard Wong",
        interviewer: 2,
      },
    },
    20: {
      id: 20,
      time: "4pm",
      interview: null,
    },
    21: {
      id: 21,
      time: "12pm",
      interview: null,
    },
    22: {
      id: 22,
      time: "1pm",
      interview: null,
    },
    23: {
      id: 23,
      time: "2pm",
      interview: {
        student: "Yuko Smith",
        interviewer: 4,
      },
    },
    24: {
      id: 24,
      time: "3pm",
      interview: null,
    },
    25: {
      id: 25,
      time: "4pm",
      interview: null,
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
    5: {
      id: 5,
      name: "Sven Jones",
      avatar: "https://i.imgur.com/twYrpay.jpg",
    },
    6: {
      id: 6,
      name: "Susan Reynolds",
      avatar: "https://i.imgur.com/TdOAdde.jpg",
    },
    7: {
      id: 7,
      name: "Alec Quon",
      avatar: "https://i.imgur.com/3tVgsra.jpg",
    },
    8: {
      id: 8,
      name: "Viktor Jain",
      avatar: "https://i.imgur.com/iHq8K8Z.jpg",
    },
    9: {
      id: 9,
      name: "Lindsay Chu",
      avatar: "https://i.imgur.com/nPywAp1.jpg",
    },
    10: {
      id: 10,
      name: "Samantha Stanic",
      avatar: "https://i.imgur.com/okB9WKC.jpg",
    },
  },
  spots: 0,
};

test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second, third, fourth, fifth] = getAppointmentsForDay(
    state,
    "Tuesday"
  );
  expect(first).toEqual(state.appointments["6"]);
  expect(second).toEqual(state.appointments["7"]);
  expect(third).toEqual(state.appointments["8"]);
  expect(fourth).toEqual(state.appointments["9"]);
  expect(fifth).toEqual(state.appointments["10"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Freyday");
  expect(result.length).toEqual(0);
});

test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String),
      }),
    })
  );
});

test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getInterviewersForDay returns an array containing the correct appointment objects", () => {
  const [first, second, third, fourth, fifth] = getInterviewersForDay(
    state,
    "Tuesday"
  );
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["2"]);
  expect(third).toEqual(state.interviewers["6"]);
  expect(fourth).toEqual(state.interviewers["9"]);
  expect(fifth).toEqual(state.interviewers["10"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Freyday");
  expect(result.length).toEqual(0);
});
