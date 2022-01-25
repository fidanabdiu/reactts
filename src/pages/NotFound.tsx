import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../models/Enums";

const NotFound: React.FC = function (): JSX.Element {
    const dispatch = useDispatch();
    useEffect(function () { dispatch({ type: Actions.ERROR, payload: "PAGE NOT FOUND" }); }, []);
    return (
        <div></div>
    );
};

export default NotFound;