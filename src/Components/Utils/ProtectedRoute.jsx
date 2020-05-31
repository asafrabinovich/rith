import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import authService from "../../Services/authService";

const ProtectedRoute = ({path, component:Component, render, ...rest}) =>{
    return(
        <Route
            {...rest}
            render={props =>{
                if(!authService.getCurrentUser()) {return <Redirect to={{
                    pathname:'/login',
                    state:{from: props.location}
                }}/>;}
                else{ return Component?  <Component {...props}/>: render(props)}
            }
            }
        />
    );
};

export default ProtectedRoute;