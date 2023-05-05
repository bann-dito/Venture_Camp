import React from "react";
import { useHistory } from "react-router-dom";


function CampListItem({camp, isHighlighted, setHighlightedCamp}) {
    const history = useHistory();

    const { title, city, state, price, photoUrl } = camp;

    let imagePath;

    if (title === 'Death Valley National Park') {
        imagePath = "death-valley"
    } else if (title === 'Channel Islands National Park') {
        imagePath = "channel-islands"
    } else if (title === 'Joshua Tree National Park') {
        imagePath = "joshua-tree"
    } else if (title === 'Kings Canyon National Park') {
        imagePath = "kings-canyon"
    } else if (title === 'Lassen Volcanic National Park') {
        imagePath = "lassen-volcanic"
    } else if (title === 'Pinnacles National Park') {
        imagePath = "pinnacles"
    } else if (title === 'Redwood National and State Parks') {
        imagePath = "redwood"
    } else if (title === 'Sequoia National Park') {
        imagePath = "sequoia-national"
    } else if (title === 'Yosemite National Park') {
        imagePath = "yosemite"
    }

    return(
        <div 
            className={"camp-list-item" + (isHighlighted ? " highlighted" : "")}
            // className="camp-list-item"
            onClick={() => history.push(`/listings/${camp.id}`)}
            onMouseOver={() => setHighlightedCamp(camp.id)}
            onMouseOut={() => setHighlightedCamp(null)}
        >

            <div className="list-item-info">
            <img src={`/assets/${imagePath}.jpg`} alt='Camp'/>
            <h1>{title}</h1>
                <div className="list-item-fields">
                    <div className="info-field">
                        {/* <span className="list-item-heading">Location:</span> */}
                        <span className="list-item-info">{city}, {state}</span>
                    </div>
                    <div className="info-field">
                        {/* <span className="list-item-heading">Price:</span> */}
                        <span className="list-item-info">From ${price} a night</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampListItem;