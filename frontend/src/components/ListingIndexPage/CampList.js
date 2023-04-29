import CampListItem from "./CampListItem";

function CampList({camps, highlightedCamp, setHighlightedCamp}) {
    return (
        <div className="camp-list">
            {camps.map(camp => (
                <CampListItem 
                camp={camp} 
                key={camp.id} 
                isHighlighted={camp.id === highlightedCamp}
                setHighlightedCamp={setHighlightedCamp}
                />
            ))}
        </div>
    )
}

export default CampList;