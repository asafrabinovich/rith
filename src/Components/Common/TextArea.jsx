import React, {Component} from "react";

const TextArea = ({name, label, error,headline,subHeadline,text, ...rest}) =>{
    return(
        <div className="form-group">
            <div className='row'>
                <h2>{headline}</h2>
            </div>

            <h6 className='w-75'>{subHeadline}</h6>
            <p
                id={name}
                name= {name}
                className="form-control"

            >
                {text}
            </p>
        </div>

    );
}
export default TextArea;