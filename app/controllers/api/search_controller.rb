class Api::SearchController < ApplicationController

    def index
        
        if params[:search].present?
            search = "%#{params[:search]}%"
            @listings = Listing.where("title ILIKE ? OR description ILIKE ? OR city ILIKE ?", search, search, search)
            render 'api/listings/index'
        else
            @listings = []
            render 'api/listings/index'
        end
    end

end
