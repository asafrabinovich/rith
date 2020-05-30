import React, {Component} from "react";

const Card = ({pic, width ='auto', height ='auto', title, details, address = null, onClick = null, parametersToClick = null}) =>{
    return(
        <div className="card" >
            <img src={pic} className="card-img-top" alt="..." width={width} height={height} />
            <div className="card-body rtl">
                <h5 className="card-title ">{title}</h5>
                <p className="card-text">{details}</p>
                {address && <p className="card-text m-0">{address}</p>}
                {onClick && <p className="text-info m-0" onClick={() =>onClick(parametersToClick) }>המשך לקרוא...</p>}

            </div>
        </div>
    );
}
export default Card;