import React from "react";
import { useHistory } from "react-router-dom";


function CampListItem({camp}) {
    const history = useHistory();

    return(
        <div onClick={() => history.push(`/listings/${camp.id}`)}>
            <h1>{camp.title}</h1>
            <h2>{camp.description}</h2>
            <h3>{camp.price}</h3>
        </div>
    )
}

export default CampListItem;