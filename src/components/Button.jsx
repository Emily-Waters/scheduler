import React from "react";
// Helpers
import classNames from "classnames";
// Styles
import "components/Button.scss";

// Button handles behaviour and style for buttons. Button is used in Appointments/
export default function Button(props) {
  const { onClick, disabled, confirm, danger, children } = props;
  const buttonClass = classNames("button", {
    " button--confirm": confirm,
    " button--danger": danger,
  });

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}
