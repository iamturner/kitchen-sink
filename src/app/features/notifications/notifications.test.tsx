import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { ProviderProps } from "react-redux";
import Notifications, { actions, reducer, useNotifications } from ".";
import { GetNotifications } from "./notifications.queries";
import Notification from "./components/ListItem";
import Providers from "../../providers";
import { useSocket } from "../../socket";

const mocks = [
  {
    request: {
      query: GetNotifications,
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

const mockDispatch = jest.fn();
const mockMutate = jest.fn();

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  // mock useLazyQuery and useMutation hooks
  useLazyQuery: jest.fn().mockImplementation((_, { onCompleted }) => {
    // trigger onCompleted event with mock notification
    if (onCompleted) {
      onCompleted(mocks[0].result.data);
    }
    return [jest.fn()];
  }),
  useMutation: jest.fn().mockImplementation(() => [mockMutate]),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  // mock useDispatch and useSelector hooks
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
  // useSelector returns array of notifications
  useSelector: jest.fn().mockImplementation(() => []),
}));

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("reducer should return the initial state", () => {
    const initialState = { value: [] };
    const state = reducer(undefined, { type: "" });

    expect(state).toEqual(initialState);
  });

  test("action should add a notification to state", () => {
    const initialState = { value: [] };

    const state = reducer(
      initialState,
      actions.add({ id: "1", message: "Notification 1" }),
    );

    expect(state.value).toEqual(
      expect.arrayContaining([{ id: "1", message: "Notification 1" }]),
    );
  });

  test("action should remove a notification from state", () => {
    const initialState = {
      value: [
        { id: "1", message: "Notification 1" },
        { id: "2", message: "Notification 2" },
      ],
    };

    const state = reducer(initialState, actions.remove("2"));

    expect(state.value).toEqual(
      expect.not.arrayContaining([{ id: "2", message: "Notification 2" }]),
    );
  });

  test("send function should trigger mutation", () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.send("Message from XXX");
    });

    expect(mockMutate).toHaveBeenCalledWith({
      variables: expect.objectContaining({ message: "Message from XXX" }),
    });
  });

  test("fetches notifications on render", async () => {
    render(
      <Providers mocks={mocks} store={store}>
        <Notifications />
      </Providers>,
    );

    // fetch message should be dispatched to store
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: mocks[0].result.data.notifications,
        type: "notifications/init",
      }),
    );
  });

  test("dispatches notifications on socket notify event", async () => {
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

    // received notifications should be dispatched to store
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          id: "2",
          message: "Notification 2",
        },
        type: "notifications/add",
      }),
    );
  });

  test("removes notification from store on button click", async () => {
    render(
      <Providers>
        <Notification id="1" message="Notification 1" />
      </Providers>,
    );

    fireEvent.click(screen.getByTitle("Remove Notification"));

    // remove action should have been called
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: "1",
        type: "notifications/remove",
      }),
    );
  });
});
