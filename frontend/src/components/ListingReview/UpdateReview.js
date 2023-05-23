import { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateReviewForm from "./UpdateReviewForm";
import './ListingReview.css';


function UpdateReview ({review}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='edit-review-button'>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateReviewForm review={review} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default UpdateReview;