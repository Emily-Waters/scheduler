import React from "react";
// Helpers
import classNames from "classnames";
// Styles
import "components/Button.scss";

// Button handles behaviour and style for buttons. Button is used in Appointments/
export default function Button(props) {
  const buttonClass = classNames("button", {
    " button--confirm": props.confirm,
    " button--danger": props.danger,
  });

  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
