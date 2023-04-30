json.listing do
    json.extract! @listing, :id, :host_id, :title, :description, :city, :state, :country, :capacity, :hiking, :biking, :rock_climbing, :fishing, :horseback_riding, :wifi, :pets, :toilet, :shower, :campfire, :price, :longitude, :latitude, :created_at, :updated_at
    # json.photo_url url_for(@listing.photo)
end

# json.users do
#     json.set! review.author_id do
#         json.extract! review.author, :id, :username
#     end
# end

@listing.reviews.includes(:author).each do |review|
    json.reviews do 
        json.set! review.id do
            json.extract! review, :id, :rating, :body, :listing_id, :author_id
        end
    end
end