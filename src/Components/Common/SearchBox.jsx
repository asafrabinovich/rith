import React, {Component} from "react";

const SearchBox = ({onChange, value, addToClassName, placeholder = 'Search...'}) =>{
    const className = "form-control my-3 " + addToClassName;
    return(
        <input
            type ='text'
            placeholder= {placeholder}
            name= 'query'
            className={className}
            value={value}
            onChange={event => onChange(event.currentTarget.value)}
        />
    );
}
export default SearchBox;