import React, {Component} from "react";

export default class Label extends Component{
    render() {
        const {name,value} = this.props;
        const text = name +': ' + value;
        return (
            <label key={name} className='w-100 text-justify' >{text}</label>
        );
    }

}