import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { State } from "./models/State";
import { User } from "./models/User";
import { Post } from "./models/Post";
import App from "./App";

describe("APP", function (): void {
  test("RENDERS 'INITIAL STATE' IN INITIAL STATE", function (): void {
    //ARRANGE
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    useSelectorMock.mockReturnValue(new State(false, new User("", ""), new Post("", "", ""), [], false, "", true, "INITIAL STATE"));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    //ACT
    //...NOTHING...
    //ASSERT
    const initialState = screen.getByText("INITIAL STATE");
    expect(initialState).toBeInTheDocument();
  });
});