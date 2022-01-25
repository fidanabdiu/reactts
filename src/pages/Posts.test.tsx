import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Post } from "../models/Post";
import Posts from "./Posts";

describe("POSTS", function () : void {
    test("RENDERS 'TEST1' TWICE", function (): void {
        //ARRANGE
        const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        let postCollection: Post[] = [];
        postCollection.push(new Post("1", "TEST1", "TEST1"));
        useSelectorMock.mockReturnValue(postCollection);
        useDispatchMock.mockReturnValue(jest.fn());
        render(<Posts />);
        //ACT
        //...NOTHING
        //ASSERT
        const test1 = screen.getAllByText("TEST1");
        expect(test1).toHaveLength(2);
    });
});