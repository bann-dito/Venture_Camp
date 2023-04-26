import React from "react";
import { useHistory } from "react-router-dom";


function CampListItem({camp}) {
    const history = useHistory();

    return(
        <div className="camp-list-item" onClick={() => history.push(`/listings/${camp.id}`)}>

            <div className="list-item-info">
            <h1>{camp.title}</h1>
                <div className="list-item-fields">
                    <div className="info-field">
                        <span className="list-item-heading">Location:</span>
                        <span className="list-item-info">{camp.city},{camp.state}</span>
                    </div>
                    <div className="info-field">
                        <span className="list-item-heading">Price:</span>
                        <span className="list-item-info">${camp.price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampListItem;