import { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateReviewForm from "./UpdateReviewForm";
import './ListingReview.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function UpdateReview ({review}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='edit-review-button'>
                <FontAwesomeIcon icon={faPenToSquare}/>
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