import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import PostForm from "./PostForm";

describe("POST FORM", function () : void {
    test("RENDERS 'POST TITLE' WHEN THE STATE TITLE IS 'POST TITLE'", function () : void {
        //ARRANGE
        const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        useSelectorMock.mockReturnValue({ id: "12", title: "POST TITLE", body: "POST BODY" });
        useDispatchMock.mockReturnValue(jest.fn());
        render(<PostForm />);
        //ACT
        //...NOTHING
        //ASSERT
        const post = screen.getByDisplayValue("POST TITLE");
        expect(post).toBeInTheDocument();
    });
    test("CALLS DISPATCH WHEN THE SAVE BUTTON IS CLICKED", function () : void {
        //ARRANGE
        const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
        const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
        useSelectorMock.mockReturnValue({ id: "", title: "TITLE", body: "BODY" });
        useDispatchMock.mockReturnValue(jest.fn());
        render(<PostForm />);
        //ACT
        const saveButton = screen.getByText("SAVE");
        userEvent.click(saveButton);
        //ASSERT
        expect(useDispatchMock).toHaveBeenCalled();
    });
});