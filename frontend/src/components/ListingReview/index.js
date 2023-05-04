import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";
import { useSelector } from "react-redux";
import LoginForm from "../SessionForms/LoginForm";


function ReviewFormModal( {listingId} ) {

    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button onClick={() => setShowModal(true)} className='review-button'>Leave a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {!sessionUser ? <LoginForm/> : <ReviewForm listingId={listingId} />}
                </Modal>
            )}
        </>
    );
}

export default ReviewFormModal;