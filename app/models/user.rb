# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

validates :username, 
  uniqueness: true, 
  length: { in: 3..30 }, 
  format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
validates :email, 
  uniqueness: true, 
  length: { in: 3..255 }, 
  format: { with: URI::MailTo::EMAIL_REGEXP }
validates :session_token, presence: true, uniqueness: true
validates :password, length: { in: 6..255 }, allow_nil: true

before_validation :ensure_session_token

has_many :listings,
  foreign_key: :host_id,
  class_name: :Listing,
  dependent: :destroy

has_many :reviews,
  foreign_key: :author_id,
  class_name: :Review,
  dependent: :destroy

has_many :bookings,
  foreign_key: :user_id,
  class_name: :Booking,
  dependent: :destroy


  
def self.find_by_credentials(credential, password)
  field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
  user = User.find_by(field => credential)
  if user&.authenticate(password)
    user
  else
    nil
  end
end

def reset_session_token!
  self.session_token = generate_unique_session_token
  save!
  session_token
end

private

def ensure_session_token
  self.session_token ||= generate_unique_session_token
end

def generate_unique_session_token
  while true
    token = SecureRandom::urlsafe_base64
    return token unless User.exists?(session_token: token)
  end
end


end
