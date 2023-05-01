import * as ReviewActions from '../../store/reviews';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginFormModal } from '../SessionForms';


import './ListingReview.css';

function ReviewForm({listingId}){
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(ReviewActions.createReview({ body, rating, listing_id: listingId }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };



    if (!sessionUser) return (
        <>
            <LoginFormModal />
        </>
    )


    return(
        <>
            {!sessionUser }
            <div className='review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    <div className='review-form-header'>
                        <h1> Leave a Review </h1>
                        <p>Share your experience with the community.</p>
                    </div>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>Rating:
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            max="5"
                            min="0"
                            required
                        />
                    </label>
                    <label>
                        <textarea
                            type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ReviewForm;