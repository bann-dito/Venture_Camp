import * as ReviewActions from '../../store/reviews';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListingReview.css';


function UpdateReviewForm({review, onClose}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        dispatch(ReviewActions.updateReview({ listing_id: review.listingId, body, rating, id: review.id }))
            .then(() => onClose())
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
    }

    return (
        <>
            <div className='update-review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    <div className='update-review-form-header'>
                        <h1> Update Review </h1>
                        <p>Update your review for this campsite.</p>
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
                            placeholder="Update your review here."
                            required
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    )
}

export default UpdateReviewForm;