# Venture Camp 🏕

Venture Camp, an online market place clone of the popular site, [HipCamp](https://www.hipcamp.com/en-US). Users can book listings and leave reviews and ratings about their experience for others to read!

[Check it out here!](https://venture-camp.herokuapp.com/) 👈

## Table Of Contents
1. [Technologies](#technologies)
2. [Features](#features)
3. [Code Highlights](#code-highlights)

## Technologies
- Ruby on Rails
- React / Redux
- JavaScript / JBuilder
- React Calendar Library
- AWS S3
- Google API

## Features
### User Authentication

Venture Camp is built with complete user authentication that comprises of User Sign Up, User Login and Demo User Login, and error handling for incorrect/incomplete enteries. Users are prompted to login when performing require user actions

![Alt Text](./login.gif)

### Booking

Users can visiting a listing and book directly on the booking, if the user does not fill in the form correctly, error will prompt the user appropiately!

![Alt Text](./booking.gif)

### Review

Users can also leave reviews detailing their experiences. If the users have second thoughts about the review that they left, they can update their review.

![Alt Text](./review.gif)

## Code Highlights

### Bookings
The below code handles Bookings on submit. If there is no session user, the login modal will prompt. Otherwise, it will check the isEditing local state value to either disptach creating a new booking or updating an exisiting booking. If there are any error during this process errors will be saved to local state and presented to the user.
```js
const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      if (!sessionUser){
        setShowModal(true);
      } else {
        if (isEditing){
          dispatch(updateBooking({booking: bookingDetails}, bookingId))
          .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors(data);
            else setErrors([res.statusText]);
          }); 
        } else {
          dispatch(createNewBooking({booking: bookingDetails}))
            .then(() => history.push("/bookings"))
            .catch(async (res) => {
              let data;
              try {
                data = await res.clone().json();
              } catch {
                data = await res.text();
              }
              if (data?.errors) setErrors(data.errors);
              else if (data) setErrors(data);
              else setErrors([res.statusText]);
            });
          }
      }
    };
```

### React Calendar

Below is a snippet from my BookingDates functional component where I utilized the React Calendar library to build my calendar that tracks the local state of dates that are selected by the user. 

```js

import Calendar from 'react-calendar';
const [dates, setDates] = useState([]);


const handleCalendarChange = (newDates) => {
      setDates(newDates);
      onChange(newDates[0], newDates[1]);
    };
  
    return (
        <div className="Date-selector-container">
          DATES
          <button onClick={() => setShowCalendar(true)}>
            <i className="fa-solid fa-calendar"/>
            {dates[0] ? dates[0].toLocaleDateString() : "Check In"} -{" "}
            {dates[1] ? dates[1].toLocaleDateString() : "Check Out"}
          </button>
          {showCalendar && (
            <div className="calendar-container">
              <Calendar
                popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }} 
                onChange={handleCalendarChange}
                selectRange={true}
                minDate={new Date()}
                next2Label={null}
                prev2Label={null}
                dropdownMode="select"
              />
            </div>
          )}
        </div>
    );

```

### Booking Validations

Below are few validations for my Rails Bookings model. These custom validations check for number of guests, if there is a booking that potentially may be overlapping, if there is no check-in/check-out date and if the checkin date is after the checkout date.

```js
    def check_num_guests
        if num_guests.present? && num_guests < 1
            errors.add(:base, "There must be at least 1 guest.")
        elsif num_guests.present? && num_guests > 10
            errors.add(:base, "There is a maximum of 10 guests.")
        end
    end


    def booking_overlap
        if Booking.where(listing_id: listing_id)
                .where.not(id: id)
                .where("(check_in, check_out) OVERLAPS (?, ?)", check_in, check_out)
                .exists?
            errors.add(:base, "This listing already has a booking during the selected dates.")
        end
    end


    def check_in_before_check_out
        if check_in.nil?
            errors.add(:base, "Select a check in date.")
        elsif check_out.nil?
            errors.add(:base, "Select a check out date.")
        elsif check_in >= check_out
            errors.add(:base, "Check in must be before check out.")
        end
    end
```
