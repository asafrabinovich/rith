import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";

const SearchBoxWithButton = ({onChange, value, addToClassName, placeholder = 'Search...', buttonText='Button',onclick}) =>{
    const className = "form-control " + addToClassName;
    return(
        <div className="input-group mb-3">
            <input
                type ='text'
                placeholder= {placeholder}
                name= 'query'
                className={className}
                value={value}
                aria-describedby="button-addon1"
                onChange={event => onChange(event.currentTarget.value)}
            />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary "
                        type="button"
                        id="button-addon2"
                        onClick={onclick}
                    >{buttonText}</button>
                </div>
        </div>
    );
}
export default SearchBoxWithButton;