import React, { useState } from "react";
// Components
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// Form handles booking appointments for students. Form manages state for interview appointments and allows a user to enter their name and select the interviewer and create a new appointment. Form components allow a user to edit and delete appointments.
export default function Form(props) {
  const { interviewers, onSave } = props;
  const [student, setStudent] = useState(props.student || "");
  const [value, setValue] = useState(student);
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // Resets name value entered by user, and selected interviewer
  const reset = () => {
    setValue("");
    setStudent("");
    setInterviewer("");
  };

  // Cancel resets the form and navigates back
  const cancel = () => {
    reset();
    props.onCancel();
  };

  const handleClick = () => {
    onSave(value, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={value}
            placeholder="Enter Student Name"
            onChange={(e) => setValue(e.target.value)}
            onSubmit={(e) => {
              setStudent(e.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={handleClick}
            disabled={!interviewer || !value}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
