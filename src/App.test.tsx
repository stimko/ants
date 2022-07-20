import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import Ants from "./components/Ants";
import userEvent from "@testing-library/user-event";

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
const mockResponse = {
  ants,
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  } as unknown as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders Race Status", () => {
  render(<App />);
  const status = screen.getByText(/Race Status/i);
  expect(status).toBeInTheDocument();
});

test("renders Load Ants Button, Start Race Button and starts race properly", async () => {
  render(<App />);
  const buttonElement = screen.getByText(/load ants/i);
  expect(buttonElement).toBeInTheDocument();

  userEvent.click(buttonElement);
  await waitForElementToBeRemoved(screen.getByText("No Ants Loaded"));

  const ele = screen.getByText("The Unbeareable Lightness of Being");
  expect(ele).toBeInTheDocument();

  const startRaceButtonElement = screen.getByText(/start race/i);
  expect(startRaceButtonElement).toBeInTheDocument();

  userEvent.click(startRaceButtonElement);
  const inProgress = screen.queryAllByText("in progress");

  expect(inProgress.length === 6);
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
