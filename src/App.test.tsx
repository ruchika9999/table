/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./../src/App";
import { headers, mokData } from "./__mockData__";

const { ResizeObserver } = window;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

test("Display default Table", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mokData.data,
  });
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });

  const completed = screen.getByText(headers.completed);
  const id = screen.getByText(headers.id);
  const title = screen.getByText(headers.title);
  const userId = screen.getByText(headers.userId);

  await (() => {
    const mockTitle = screen.getByText("quis ut nam facilis et officia qui");
    const mockId = screen.getByText("2");

    expect(id).toBeInTheDocument();
    expect(completed).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(userId).toBeInTheDocument();
    expect(mockId).toBeInTheDocument();
    expect(mockTitle).toBeInTheDocument();
  });
});

test("Go to next table data", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mokData.data,
  });
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });

  const nextButton = screen.getByTestId("next-button");

  userEvent.click(nextButton);
  act(() => {
    userEvent.click(nextButton);
  });

  await (() => {
    const mockTitle = screen.getByText(
      "molestiae ipsa aut voluptatibus pariatur dolor nihil"
    );
    const mockId = screen.getByText("19");

    expect(mockId).toBeInTheDocument();
    expect(mockTitle).toBeInTheDocument();
  });
});

test("Go to prv table data", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mokData.data,
  });
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });
  const prvButton = screen.getByTestId("prv-button");
  act(() => {
    userEvent.click(prvButton);
  });

  await (() => {
    const mockTitle = screen.getByText("quis ut nam facilis et officia qui");
    const mockId = screen.getByText("2");

    expect(mockId).toBeInTheDocument();
    expect(mockTitle).toBeInTheDocument();
  });
});
