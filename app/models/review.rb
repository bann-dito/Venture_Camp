# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  listing_id :bigint           not null
#  rating     :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Review < ApplicationRecord
    validates :body, presence: true
    validates :rating, presence: true, inclusion: { in: 1..5 }
    validates :author_id, uniqueness: { scope: :listing_id, message: "You've already reviewed this listing" }

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :listing,
        foreign_key: :listing_id,
        class_name: :Listing



end
