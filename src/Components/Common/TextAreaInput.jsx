import React, {Component} from "react";

const TextAreaInput = ({name, label, error,headline,subHeadline,onRemove, ...rest}) =>{
    return(
        <div className="form-group">
            <div className='row'>
            <h2>{headline}</h2>
                {
                    onRemove &&
                    <p onClick={()=>{
                        onRemove(name)
                    }} style={{cursor:'pointer'}} className='btn-link ml-1 mt-3 '>הסר</p>
                }
            </div>

            <h6 className='w-75'>{subHeadline}</h6>
            <textarea
                {...rest}
                id={name}
                name= {name}
                className="form-control"/>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>

    );
}
export default TextAreaInput;