import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("HEADER", function (): void {
    test("RENDERS 'LOG OUT'", function (): void {
        //ARRANGE
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        useDispatchMock.mockReturnValue(jest.fn());
        render(<BrowserRouter><Header /></BrowserRouter>);
        //ACT
        //...NOTHING
        //ASSERT
        const logout = screen.getByText("LOG OUT");
        expect(logout).toBeInTheDocument();
    });
    test("CALLS DISPATCH WHEN THE LOGOUT LINK IS CLICKED", function (): void {
        //ARRANGA
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        useDispatchMock.mockReturnValue(jest.fn());
        render(<BrowserRouter><Header /></BrowserRouter>);
        //ACT
        const logoutLink = screen.getByText("LOG OUT");
        userEvent.click(logoutLink);
        //ASSERT
        expect(useDispatchMock).toBeCalled();
    });
});