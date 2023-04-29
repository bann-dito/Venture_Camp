import React from "react";
import { useHistory } from "react-router-dom";


function CampListItem({camp, isHighlighted, setHighlightedCamp}) {
    const history = useHistory();

    const { title, city, state, price, photoUrl } = camp;

    return(
        <div 
            className={"camp-list-item" + (isHighlighted ? " highlighted" : "")}
            // className="camp-list-item"
            onClick={() => history.push(`/listings/${camp.id}`)}
            onMouseOver={() => setHighlightedCamp(camp.id)}
            onMouseOut={() => setHighlightedCamp(null)}
        >

            <div className="list-item-info">
            {photoUrl && <img src={photoUrl} alt='Camp'/>}
            <h1>{title}</h1>
                <div className="list-item-fields">
                    <div className="info-field">
                        {/* <span className="list-item-heading">Location:</span> */}
                        <span className="list-item-info">{city}, {state}</span>
                    </div>
                    <div className="info-field">
                        {/* <span className="list-item-heading">Price:</span> */}
                        <span className="list-item-info">${price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampListItem;