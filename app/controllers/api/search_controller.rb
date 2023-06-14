class Api::SearchController < ApplicationController

    def index
        
        if params[:search].present?
            search = "%#{params[:search]}%"
            @listings = Listing.where("title ILIKE ? OR description ILIKE ? OR city ILIKE ?", search, search, search)
                                .where("NOT EXISTS (
                                    SELECT 1
                                    FROM bookings
                                    WHERE bookings.listing_id = listings.id
                                    AND (bookings.check_in, bookings.check_out) OVERLAPS (?, ?)
                                )", params[:check_in], params[:check_out])
            render 'api/listings/index'
        elsif params[:available_tonight].present?
            @listings = Listing.where("NOT EXISTS (
                SELECT 1
                FROM bookings
                WHERE bookings.listing_id = listings.id
                AND (bookings.check_in, bookings.check_out) OVERLAPS (?, ?)
            )", Date.today, Date.tomorrow)
            render 'api/listings/index'
        else
            @listings = []
            render 'api/listings/index'
        end
    end

end
