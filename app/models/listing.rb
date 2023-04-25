# == Schema Information
#
# Table name: listings
#
#  id               :bigint           not null, primary key
#  host_id          :bigint           not null
#  title            :string           not null
#  description      :string           not null
#  city             :string           not null
#  state            :string           not null
#  country          :string           not null
#  capacity         :integer          not null
#  hiking           :boolean          default(FALSE)
#  biking           :boolean          default(FALSE)
#  rock_climbing    :boolean          default(FALSE)
#  fishing          :boolean          default(FALSE)
#  horseback_riding :boolean          default(FALSE)
#  wifi             :boolean          default(FALSE)
#  pets             :boolean          default(FALSE)
#  toilet           :boolean          default(FALSE)
#  shower           :boolean          default(FALSE)
#  campfire         :boolean          default(FALSE)
#  price            :float            not null
#  longitude        :float            not null
#  latitude         :float            not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Listing < ApplicationRecord
    validates :host_id, :title, :description, :city, :state, :country, :longitude, :latitude, presence: true
    validates :price, inclusion: { in: 10...1000, message: "price must be set betwen 10 and 1000"}
    validates :capacity, inclusion: {in: 1...10, message: 'capacity must be set between 1 and 10'}
    validates :hiking, :biking, :rock_climbing, :fishing, :horseback_riding, 
    :wifi, :pets, :toilet, :shower, :campfire, 
    inclusion: [true, false]

    belongs_to :user,
        foreign_key: :host_id,
        class_name: :User




end
