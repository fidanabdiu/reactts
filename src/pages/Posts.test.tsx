import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import store from "../redux/store";
import { State } from "../models/State";
import { User } from "../models/User";
import { Post } from "../models/Post";
import Posts from "./Posts";

describe("POSTS", function () {
    test("RENDERS 'POSTS'", function () {
        //ARRANGE
        const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
        useSelectorMock.mockReturnValue(new State(false, new User("", ""), new Post("", "", ""), [], false, "", true, "INITIAL STATE"));
        render(<Provider store={store}><Posts /></Provider>);
        //ACT
        //...NOTHING...
        //ASSERT
        const posts = screen.getByText("POSTS");
        expect(posts).toBeInTheDocument();
    });
});