import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import Ants from "./components/Ants";
import userEvent from "@testing-library/user-event";

test("renders Race Status", () => {
  render(<App />);
  const status = screen.getByText(/Race Status/i);
  expect(status).toBeInTheDocument();
});

test("renders Load Ants Button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/load ants/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders Start Race Button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/start race/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders Ants", async () => {
  const ants = [
    { name: "Marie ‘Ant’oinette", length: 12, color: "BLACK", weight: 2 },
    { name: "Flamin’ Pincers", length: 11, color: "RED", weight: 2 },
    { name: "AuNT Sarathi", length: 20, color: "BLACK", weight: 5 },
    {
      name: "The Unbeareable Lightness of Being",
      length: 5,
      color: "SILVER",
      weight: 1,
    },
    { name: "‘The Duke’", length: 17, color: "RED", weight: 3 },
  ];
  render(<Ants ants={ants} antProbability={{}} antStatus={{}} />);
  const ele = screen.getByText("The Unbeareable Lightness of Being");
  expect(ele).toBeInTheDocument();
});
