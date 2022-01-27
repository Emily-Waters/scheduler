import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByText,
  getAllByAltText,
  getByPlaceholderText,
  getAllByTestId,
  waitForElementToBeRemoved,
  queryByText,
  within,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getAllByAltText(container, "Add")[0]);
    const input = getByPlaceholderText(container, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getAllByTestId(container, "interviewer-img")[0]);
    fireEvent.click(getByText(container, "Save"));
    expect(getByText(container, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(container, "Saving"));
    expect(getByText(container, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const cancelBtn = await waitForElement(
      () => getAllByAltText(container, "Delete")[0]
    );
    fireEvent.click(cancelBtn);
    const confirmBtn = await waitForElement(
      () => getAllByText(container, "Confirm")[0]
    );
    fireEvent.click(confirmBtn);
    await waitForElementToBeRemoved(() => getByText(container, "Deleting"));
    const day = await waitForElement(() => getAllByTestId(container, "day")[0]);
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const editBtn = getAllByAltText(container, "Edit")[0];
    //! debug(editBtn);
    fireEvent.click(editBtn);
    const saveBtn = getByText(container, "Save");
    //! debug(saveBtn);
    fireEvent.click(saveBtn);
    await waitForElementToBeRemoved(() => getByText(container, "Saving"));
    const day = await waitForElement(() => getAllByTestId(container, "day")[0]);
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});

// "loads data, edits an interview and keeps the spots remaining for Monday the same";
// "shows the save error when failing to save an appointment";
// "shows the delete error when failing to delete an existing appointment";
