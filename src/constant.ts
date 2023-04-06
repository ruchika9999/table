export const STEP = 10;

export const enum Status {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const headers = [
  { name: "ID" },
  { name: "Title" },
  { name: "Completed" },
  { name: "UserId" },
];
