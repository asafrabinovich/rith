import React, {Component} from "react";
import auth from "../../Services/authService";

export default class Logout extends Component{
    componentDidMount() {
        auth.logout("token");
        window.location = '/';
    }

    render() {
        return null;
    }

}