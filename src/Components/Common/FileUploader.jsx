import React, {Component} from "react";
import {uploadImage} from "../../Services/httpService";

export default class FileUploader extends Component{


    clearFiles =  async event =>{
        event.target.value = null; //check if causes problem
    }
    render() {
        const {headline,onChange} = this.props;
        return(
            <div className="frame">
                <div>
                    <h6 className='ml-2'>{headline} </h6>

                    <div className="dropzone">
                        <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon"/>
                        <input type="file" className="upload-input" onChange={onChange} onClick={this.clearFiles}/>
                    </div>

                    <p >גרור את הקובץ</p>

                </div>
            </div>
        );
    }
}