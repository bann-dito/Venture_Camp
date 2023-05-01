import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";

function ReviewFormModal( {listingId} ) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button onClick={() => setShowModal(true)} className='review-button'>Leave a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewForm listingId={listingId} />
                </Modal>
            )}
        </>
    );
}

export default ReviewFormModal;