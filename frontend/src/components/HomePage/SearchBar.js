import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchListingsBySearch } from "../../store/listings";



function SearchBar() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams({
            search,
            checkIn,
            checkOut
        });
        history.push(`/listings?${searchParams.toString()}`);
        // dispatch(fetchListingsBySearch(search, checkIn, checkOut));
    }

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input 
            
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for california nation park" 
                    required

                />

                <input

                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    placeholder="Check In" 
                    required

                />

                <input 

                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    placeholder="Check Out" 
                    required

                />

                <button type="submit">Search</button>
            </form>
        </div>
    )

}

export default SearchBar;