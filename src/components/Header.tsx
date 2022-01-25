import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Actions } from "../models/Enums";

const Header : React.FC = function() : JSX.Element{
    const dispatch = useDispatch();
    const logoutHandler = function () {
        dispatch({ type: Actions.LOGGED_OUT });
    };
    return(
        <header>
            <nav>
                <ul className="navigation">
                    <li className="navigationitem"><NavLink className="navigationitemlink" activeClassName="activenavigationitemlink" to="/home">HOME</NavLink></li>
                    <li className="navigationitem"><NavLink className="navigationitemlink" activeClassName="activenavigationitemlink" to="/posts">POSTS</NavLink></li>
                    <li className="navigationitem"><NavLink className="navigationitemlink" onClick={logoutHandler} to="">LOG OUT</NavLink></li>
                </ul>
            </nav>
        </header>        
    );
};

export default Header;