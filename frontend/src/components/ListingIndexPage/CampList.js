import CampListItem from "./CampListItem";

function CampList(camps) {
    
    return (
        <div className="camp-list">
            {camps.camps.map(camp => (
                <CampListItem camp={camp} key={camp.id} />
            ))}
        </div>
    )
}

export default CampList;