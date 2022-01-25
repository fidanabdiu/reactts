import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("HOME", function (): void {
    test("RENDERS 'WELCOME TO THE HOME PAGE'", function (): void {
        //ARRANGE
        render(<Home />);
        //ACT
        //...NOTHING...
        //ASSERT
        const welcome = screen.getByText("WELCOME TO THE HOME PAGE");
        expect(welcome).toBeInTheDocument();
    });
});