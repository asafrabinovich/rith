import React, {Component} from "react";

export default class FileUploader extends Component{
    render() {
        const {headline,onChange} = this.props;
        return(
            <div className="frame">
                <div>
                    <h6 className='ml-2'>{headline} </h6>

                    <div className="dropzone">
                        <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon"/>
                        <input type="file" className="upload-input" onChange={onChange}/>
                    </div>

                    <p >גרור את הקובץ</p>

                </div>
            </div>
        );
    }
}