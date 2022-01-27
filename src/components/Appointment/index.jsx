import React, { useEffect } from "react";
// Components
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
// Styles
import "./styles.scss";
// Helpers
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  const EMPTY = "EMPTY";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const EDIT = "EDIT";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW, true))
      .catch(() => transition(ERROR_SAVE));
  };

  const deleteInterview = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(SHOW, true))
      .catch(() => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM, true)}
          onEdit={() => transition(EDIT, true)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, true)} />}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to cancel this interview?"}
          onConfirm={deleteInterview}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error
          message={"An Error occured while deleting"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"An Error occured while saving"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
