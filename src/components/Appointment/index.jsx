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
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview() {
    const interview = null;
    transition(DELETING);
    cancelInterview(id, interview).then(() => {
      transition(EMPTY);
    });
  }

  const EMPTY = "EMPTY";
  const EDIT = "EDIT";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMDELETE = "CONFIRMDELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          id={interview.id}
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRMDELETE)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
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
          onDelete={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
    </article>
  );
}
