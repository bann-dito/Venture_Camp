class Api::BookingsController < ApplicationController
    before_action :require_logged_in

    def index
        @bookings = current_user.bookings
        render :index
    end

    def create
        @booking = Booking.new(booking_params)
        
        if @booking.save
            render :show
        else
            render json: @booking.errors.full_messages, status: 422
        end
    end

    def destroy
        @booking = Booking.find(params[:id])
        if current_user.id == @booking.user_id
            @booking.destroy
            render :show
        else
            render json: @booking.errors.full_messages, status: 422
        end
    end

    private

    def booking_params
        params.require(:booking).permit(:user_id, :listing_id, :check_in, :check_out, :num_guests)
    end

end
