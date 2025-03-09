import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ProviderProps } from "react-redux";
import Notifications, { actions, reducer } from ".";
import Notification from "./components/Notification";
import Providers from "../../providers";
import { useSocket } from "../../socket";
import { gql } from "@apollo/client";

const mocks = [
  {
    request: {
      query: gql`
        query GetNotifications {
          notifications {
            id
            message
          }
        }
      `,
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
  let store: ProviderProps["store"];

  beforeEach(() => {
    // Recreate redux store before each test to ensure a fresh instance
    store = configureStore({
      reducer: {
        notifications: reducer,
      },
    });
  });

  test("reducer should return the initial state", () => {
    const initialState = { value: [] };
    const state = reducer(undefined, { type: "" });

    expect(state).toEqual(initialState);
  });

  test("action should add a notification to state", () => {
    const initialState = { value: [] };

    const action = actions.add({ id: "1", message: "Notification 1" });
    const state = reducer(initialState, action);

    expect(state.value).toHaveLength(1);
  });

  test("action should remove a notification from state", () => {
    const initialState = {
      value: [
        { id: "1", message: "Notification 1" },
        { id: "2", message: "Notification 2" },
      ],
    };

    const action = actions.remove("id");
    const state = reducer(initialState, action);

    expect(state.value).toHaveLength(1);
  });

  test("calls add action on render with successful fetch and displays notification", async () => {
    // spy on "add" action in notifications slice
    const addSpy = jest.spyOn(actions, "add");

    render(
      <Providers mocks={mocks} store={store}>
        <Notifications />
      </Providers>,
    );
    // add action should have been called
    await waitFor(() => expect(addSpy).toHaveBeenCalled());
    // fetch message should be displayed
    expect(screen.getByText(mocks[0].result.data.notifications[0].message));
  });

  test("calls add action on socket notify event", async () => {
    // spy on "add" action in notifications slice
    const addSpy = jest.spyOn(actions, "add");

    render(
      <Providers mocks={mocks} store={store}>
        <Notifications />
      </Providers>,
    );

    const { socket } = (useSocket as jest.Mock)();

    act(() => {
      socket.on.mock.calls.find((call: string) => call[0] === "notify")[1]({
        id: "2",
        message: "Notification 2",
      });
    });
    // add action should have been called for received notification
    await waitFor(() =>
      expect(addSpy).toHaveBeenCalledWith({
        id: "2",
        message: "Notification 2",
      }),
    );
  });

  test("calls remove action on button click", async () => {
    // spy on "remove" action in notifications slice
    const removeSpy = jest.spyOn(actions, "remove");

    render(
      <Providers>
        <Notification id="1" message="Notification 1" />
      </Providers>,
    );

    fireEvent.click(screen.getByTitle("Remove Notification"));
    // remove action should have been called
    await waitFor(() => expect(removeSpy).toHaveBeenCalled());
  });
});
