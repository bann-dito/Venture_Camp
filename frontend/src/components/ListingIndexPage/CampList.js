import CampListItem from "./CampListItem";

function CampList(camps) {
    
    return (
        <div className="camp-list">
            <h1>Camp Sites</h1>
            {camps.camps.map(camp => (
                <CampListItem camp={camp} key={camp.id} />
            ))}
        </div>
    )
}

export default CampList;