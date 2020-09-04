import React, {Component, createContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserIcon from "../../../Resources/Images/UserIcon.png"
import Approved from "../../../Resources/Images/Approved.png";

export default class NavBar extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light rtl">
                <Link className="navbar-brand rtl" to="/">RITH</Link>
                <button className="navbar-toggler rtl" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon rtl"></span>
                </button>
                <div className="collapse navbar-collapse rtl" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item rtl ">
                            <NavLink className="nav-link" to="/"> חיפוש דירה<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item rtl ">
                            <NavLink className="nav-link" to="/upload-review">העלה ביקורת<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">עלינו</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">צור קשר</NavLink>
                        </li>
                        {
                            !this.props.user &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">התחברות</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">הרשמה</NavLink>
                                </li>
                            </React.Fragment>
                        }
                        {
                            this.props.user &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">{this.props.user.name}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">התנתק</NavLink>
                                </li>
                            </React.Fragment>
                        }
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/private-area">
                                <img src={UserIcon} className='user-icon-pic'/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}
