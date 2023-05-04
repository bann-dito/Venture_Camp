import csrfFetch from "./csrf"

const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const GET_BOOKINGS = 'bookings/GET_BOOKINGS'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

export const getBookings = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
})

export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

export const fetchBookings = () => async (dispatch) => {
    const res = await csrfFetch('/api/bookings')
    const {bookings} = await res.json()
    dispatch(getBookings(bookings))
}

export const createNewBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(booking)
    })
    const data = await res.json()
    dispatch(createBooking(data.booking))
    return data
}

export const removeBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    dispatch(deleteBooking(bookingId))
    return res
}

const bookingsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = {...state}
    switch (action.type) {
        case GET_BOOKINGS:
            return {...newState, ...action.bookings}
        case CREATE_BOOKING:
            return {...newState, [action.booking.id]: action.booking}
        case DELETE_BOOKING:
            delete newState[action.bookingId]
            return newState
        default:
            return state
    }
}

export default bookingsReducer