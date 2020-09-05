import React, {Component} from "react";
import {Rating} from "@material-ui/lab";
import {Container} from "@material-ui/core";

const PrivateAreaCard = ({pic, width = 'auto', height = 'auto', title, ratingStatus, status, onClick = null, parametersToClick = null}) => {
    const statusText = "סטטוס: " + status
    return (
        <div className="card">
            <img src={pic} className="card-img-top" alt="..." width={width} height={height}/>
            <div className="card-body rtl">
                <h5 className="card-title ">{title}</h5>
                <Rating dir="ltr" name="read-only" value={ratingStatus} readOnly/>
                <h6>{statusText}</h6>

            </div>
        </div>
    );
}
export default PrivateAreaCard;