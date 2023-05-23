# == Schema Information
#
# Table name: bookings
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  check_in   :date             not null
#  check_out  :date             not null
#  num_guests :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Booking < ApplicationRecord

    validates :user_id, :listing_id, :check_in, :check_out, presence: true
    # validates :num_guests, presence: true, inclusion: { in: (1..10) }
    validate :check_num_guests
    validate :check_in_before_check_out
    validate :booking_overlap

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :listing,
        foreign_key: :listing_id,
        class_name: :Listing



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
            errors.add(:base, "Select a check in date cannot be blank.")
        elsif check_out.nil?
            errors.add(:base, "Select a check out date cannot be blank.")
        elsif check_in >= check_out
            errors.add(:base, "Check in must be before check out.")
        end
    end


end
