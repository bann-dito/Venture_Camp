json.review do
    json.extract! @review, :id, :rating, :body, :listing_id, :author_id
end

json.user do
    json.extract! @review.author, :id, :username
end

json.listing do
    json.extract! @review.listing, :id, :host_id, :title, :description, :city, :state, :country, :capacity, :hiking, :biking, :rock_climbing, :fishing, :horseback_riding, :wifi, :pets, :toilet, :shower, :campfire, :price, :longitude, :latitude, :created_at, :updated_at
end


