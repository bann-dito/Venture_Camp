import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import SearchBar from "./SearchBar"
import { fetchListings, fetchListingsBySearch} from "../../store/listings"
import { useDispatch } from "react-redux"

import "./HomePage.css"

function HomePage(){
    const history = useHistory()
    const dispatch = useDispatch()

    const allListingsClick = () => {
        dispatch(fetchListings())
        history.push("/listings")
    }

    return(
        <>
        <div className="Home-Page-Container">
            <div className="Home-Page-Text-Heading">
                <h1>Find yourself outside.</h1>
                <p>Discover and book tent camping, RV parks, cabins, glamping and more.</p>
            </div>
            <div className="Home-Page-Image-Container"> 
                <SearchBar/>
                <img className="Home-Page-Header-Image" src="/assets/lake.jpg" alt="camping" />
            </div>
            <div className="Home-Page-Card-Container">
                <div className="Home-Page-Card">
                    <div className="Home-Page-Card-Image-Container">
                        <img src="/assets/hipcamp-rei-save-a-spot.jpg" alt="camping" />
                    </div>
                    <div className="Home-Page-Card-Info" id="Card-One">
                        <div className="Home-Page-Card-Text">
                            <h3>LONG WEEKEND</h3>
                            <p>Stay an extra day for those summer weekends.</p>
                        </div>
                        <button className="Home-Page-Book-Now" onClick={() => allListingsClick()}>Book Now</button>
                    </div>
                </div>
                <div className="Home-Page-Card">
                    <div className="Home-Page-Card-Image-Container">
                        <img src="/assets/campfire.jpg" alt="camping" />
                    </div>
                    <div className="Home-Page-Card-Info" id="Card-Two">
                        <div className="Home-Page-Card-Text">
                            <h3>BEST OF 2023</h3>
                            <p>Californias best Venture Camps to visit in 2023.</p>
                        </div>
                        <button className="Home-Page-Book-Now" id="Button-Two"onClick={() => history.push("/listings")}>Book Now</button>
                    </div>
                </div>
            </div>
            <div className="Home-Page-Sub-Card-Container">
                <h3>Find your next getaway</h3>
                <div className="Home-Page-Sub-Cards">
                    <div className="Sub-Card" onClick={() => history.push("/listings")}>
                        <div className="Sub-Card-Image-Container">
                            <img src="/assets/tonight.jpg" alt="camping" />
                            <button className="Sub-Card-Button" id="Button-three"> Available Tonight </button>
                        </div>
                    </div>
                    <div className="Sub-Card" onClick={() => history.push("/listings")}>
                        <div className="Sub-Card-Image-Container">
                            <img src="/assets/swim.jpg" alt="camping" />
                            <button className="Sub-Card-Button" id="Button-four"> This Weekend </button>
                        </div>
                    </div>
                    <div className="Sub-Card" onClick={() => history.push("/listings")}>
                        <div className="Sub-Card-Image-Container">
                            <img src="/assets/Sequoia.jpg" alt="camping" />
                            <button className="Sub-Card-Button" id="Button-five"> Next Weekend </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="Home-Page-Footer"> </footer>
        </>
    )

}

export default HomePage