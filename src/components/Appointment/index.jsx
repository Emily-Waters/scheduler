import React from "react";
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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteInterview() {
    const interview = null;
    transition(DELETING);
    cancelInterview(id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  const EMPTY = "EMPTY";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const EDIT = "EDIT";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMDELETE = "CONFIRMDELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          id={interview.id}
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRMDELETE, true)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY, true)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
          interviewer={interview.interviewer.id}
          student={interview.student}
        />
      )}
      {mode === CONFIRMDELETE && (
        <Confirm
          message={"Are you sure you would like to cancel this interview?"}
          onDelete={() => transition(SHOW, true)}
          onConfirm={deleteInterview}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error
          message={"An Error occured while deleting"}
          onClose={() => transition(SHOW, true)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"An Error occured while saving"}
          onClose={() => transition(EMPTY, true)}
        />
      )}
    </article>
  );
}
