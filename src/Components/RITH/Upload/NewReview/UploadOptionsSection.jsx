import React, {Component} from "react";
import MalfunctionsModal from "../../Modals/MalfunctionsModal";

const UploadOptionsSection = ({buttonText,onClick,text,itemsForModal}) =>{
    return (
        <div>
            <div className='row'>
                <MalfunctionsModal
                    items = {itemsForModal}
                    onItemSelected={onClick}
                    launchButtonText ={buttonText}
                />

            </div>
            <div className='row'>
                <h6 className='mt-1'>{text}</h6>
            </div>

        </div>
    );
}
export default UploadOptionsSection