import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import PostList from "./PostList";

describe("POST LIST", function () : void {
    test("RENDERS 'TEST1'", function () : void {
        //ARRANGE
        const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        useSelectorMock.mockReturnValue([{ id: "1", title: "TEST1", body: "TEST1" }]);
        useDispatchMock.mockReturnValue(jest.fn());
        render(<PostList />);
        //ACT
        //...NOTHING
        //ASSERT
        const test1 = screen.getAllByText("TEST1");
        expect(test1).toHaveLength(2);
    });
});