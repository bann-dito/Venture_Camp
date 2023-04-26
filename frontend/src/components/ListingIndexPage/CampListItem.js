import React from "react";
import { useHistory } from "react-router-dom";


function CampListItem({camp}) {
    const history = useHistory();

    return(
        <div className="camp-list-item" onClick={() => history.push(`/listings/${camp.id}`)}>

            <div className="camp-title">
            <h1>{camp.title}</h1>
                <div className="camp-items">
                    <div className="camp-info">
                        <span className="camp-item-heading">Location:</span>
                        <span className="camp-item-info">{camp.city},{camp.state}</span>
                    </div>
                    <div className="camp-info">
                        <span className="camp-item-heading">Price:</span>
                        <span className="camp-item-info">${camp.price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampListItem;