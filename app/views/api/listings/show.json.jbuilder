json.listing do
    json.extract! @listing, :id, :host_id, :title, :description, :city, :state, :country, :capacity, :hiking, :biking, :rock_climbing, :fishing, :horseback_riding, :wifi, :pets, :toilet, :shower, :campfire, :price, :longitude, :latitude, :created_at, :updated_at
end