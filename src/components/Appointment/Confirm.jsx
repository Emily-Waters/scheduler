import React from "react";
// Components
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onDelete } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onDelete}>
          Cancel
        </Button>
        <Button danger onClick={onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
