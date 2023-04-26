import CampListItem from "./CampListItem";

function CampList(camps) {

    
    return (
        <div>
            <h1>CampList</h1>
            {camps.camps.map(camp => (
                <CampListItem camp={camp} key={camp.id} />
            ))}
        </div>
    )
}

export default CampList;