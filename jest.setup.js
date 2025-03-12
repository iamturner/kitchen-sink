import { matchers } from "@emotion/jest";
import { TextDecoder, TextEncoder } from "util";

// required for tests with react router
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

expect.extend(matchers);

jest.mock("./src/app/lib/socket", () => ({
  ...jest.requireActual("./src/app/lib/socket"),
  // mock useSocket hook
  useSocket: jest.fn().mockReturnValue({
    socket: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));
