import { matchers } from "@emotion/jest";

expect.extend(matchers);

jest.mock("./src/app/socket", () => ({
  ...jest.requireActual("./src/app/socket"),
  // mock useSocket hook
  useSocket: jest.fn().mockReturnValue({
    socket: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));
