json.listings do 
    @listings.each do |listing|
        json.set! listing.id do
            json.extract! listing, :id, :host_id, :title, :description, :city, :state, :country, :capacity, :hiking, :biking, :rock_climbing, :fishing, :horseback_riding, :wifi, :pets, :toilet, :shower, :campfire, :price, :longitude, :latitude, :created_at, :updated_at
        end
    end
end