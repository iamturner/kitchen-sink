import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { matchers } from "@emotion/jest";
import Notifications, { GET_NOTIFICATIONS } from "./Notifications";
import { actions } from "./notifications.slice";
import Providers from "../../providers";

expect.extend(matchers);

const mocks = [
  {
    request: {
      query: GET_NOTIFICATIONS,
    },
    result: {
      data: {
        notifications: [
          {
            id: "1",
            message: "This is a test message",
          },
        ],
      },
    },
  },
];

describe("Feature: Notifications", () => {
  test("Calls create action on render with successful fetch and displays notification", async () => {
    // spy on "add" action in notifications slice
    const createSpy = jest.spyOn(actions, "add");

    render(
      <Providers mocks={mocks}>
        <Notifications />
      </Providers>,
    );
    // create action should have neem called
    await waitFor(() => expect(createSpy).toHaveBeenCalled());
    // fetch message should be displayed
    expect(screen.getByText(mocks[0].result.data.notifications[0].message));
  });
});
