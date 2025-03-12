import { matchers } from "@emotion/jest";
import { TextDecoder, TextEncoder } from "util";

// required for tests with react router
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

expect.extend(matchers);

jest.mock("./src/lib/socket", () => ({
  ...jest.requireActual("./src/lib/socket"),
  // mock useSocket hook
  useSocket: jest.fn().mockReturnValue({
    socket: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));
