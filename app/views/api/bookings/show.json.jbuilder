json.booking do 
    json.extract! @booking, :id, :user_id, :listing_id, :check_in, :check_out, :num_guests
end

json.user do
    json.extract! @booking.user, :id, :username
end

json.listing do
    json.extract! @booking.listing, :id, :host_id, :title
end