import React from "react";
import { act, render, screen } from "@testing-library/react";
import { matchers } from "@emotion/jest";
import { Provider } from "react-redux";
import Notifications from "./Notifications";
import store from "../../store";
import { actions } from "./notifications.slice";

expect.extend(matchers);

const mockNotificationMessage = "This is a test message";

let fetchResponseOk = true;

describe("Feature: Notifications", () => {
  // mock fetch call
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                date: new Date().toISOString(),
                id: 1,
                message: mockNotificationMessage,
              },
            ],
          }),
        ok: fetchResponseOk,
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchResponseOk = true;
  });

  test("Calls create action on render with successful fetch and displays notification", async () => {
    const createSpy = jest.spyOn(actions, "add");

    await act(async () => {
      render(
        <Provider store={store}>
          <Notifications />
        </Provider>,
      );
    });
    // create action should have neem called
    expect(createSpy).toHaveBeenCalled();
    // fetch message should be displayed
    expect(screen.getByText(mockNotificationMessage));
  });

  test("Should render without error after unsuccessful fetch", async () => {
    // force failed response from mock fetch
    fetchResponseOk = false;

    const createSpy = jest.spyOn(actions, "add");

    await act(async () => {
      render(
        <Provider store={store}>
          <Notifications data-testid="notifications-list" />
        </Provider>,
      );
    });
    // create action should not have neem called
    expect(createSpy).not.toHaveBeenCalled();
    // fetch message should be displayed
    expect(screen.getByTestId("notifications-list"));
  });
});
