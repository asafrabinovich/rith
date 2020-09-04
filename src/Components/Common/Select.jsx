import React, {Component} from "react";

const Select = ({name, label, error, options, selectedOption, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}></label>{label}
            <select
                {...rest}
                id={name}
                name={name}
                className="form-control">
                {options.map(option => {
                        return <option key={option.name} value={option._id}
                                       selected={shouldBeSelected(option.name, selectedOption)}>{option.name}</option>
                    }
                )}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>

    );
}

export function shouldBeSelected(option, selectedOption) {
    return option.name === selectedOption ? true : false
}


export default Select;