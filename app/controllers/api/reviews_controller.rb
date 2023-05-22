class Api::ReviewsController < ApplicationController
    before_action :require_logged_in
    # wrap_parameters include Review.attribute_names + [:listingId]

    def create
        @review = current_user.reviews.new(review_params)

        if @review.save
            render :show
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
        
    end

    def update
        @review = current_user.reviews.find(params[:id])
        if @review.update(review_params)
            render :show
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
    end


    def destroy

        @review = current_user.reviews.find(params[:id])

        if @review
            @review.destroy
            render :show
        else
            render json: {message: "You don't own this review" }, status: :unauthorized
        end
        
    end



    private

    def review_params
        params.require(:review).permit(:listing_id, :rating, :body)
    end


end
