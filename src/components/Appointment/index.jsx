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
  const { time, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewers[interview.interviewer]}
          onEdit={() => transition(CREATE)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onSave={() => transition(CONFIRM)}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm onDelete={() => back()} onConfirm={() => transition(STATUS)} />
      )}
      {mode === STATUS && <Status message={"Saving"} />}
    </article>
  );
}
