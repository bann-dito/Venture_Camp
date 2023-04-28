# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Listing.destroy_all
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    coordinates = [  
      [ 37.7694, -122.4862],
      [37.7598, -122.4279],  
      [37.7596, -122.4275],  
      [37.8042, -122.4648],  
      [ 37.7986, -122.4641],  
      [  37.8017, -122.2586],  
      [37.8924, -122.2436],  
      [ 37.7351, -122.4844],  
      [37.8117, -122.1822],  
      [  37.7764, -122.4344],  
      [37.7858, -122.4020],  
      [37.7959, -122.2794],  
      [37.8849, -122.2657],  
      [37.7679, -122.4676],  
      [37.7361, -122.4392],  
      [37.7549, -122.4474],  
      [37.8044, -122.4322],  
      [ 37.7933, -122.4833],  
      [37.8975, -122.5818],  
      [37.8609, -122.4328]
    ]

    # number = 0
    # 20.times do 

    #   long = coordinates[number][0]
    #   lat = coordinates[number][1]
    #   p long, lat
    #   number +=1
      



    # end






    puts "Creating listings..."
    number = 0
    20.times do
      Listing.create!({
        host_id: 1,
        longitude: coordinates[number][1],
        latitude: coordinates[number][0],
        title: "test listing title: #{number += 1}",
        description: "test listing description: #{number}",
        city: Faker::Address.city,
        state: Faker::Address.state,
        country: Faker::Address.country,
        capacity: rand(1...10),
        hiking: Faker::Boolean.boolean,
        rock_climbing: Faker::Boolean.boolean,
        fishing: Faker::Boolean.boolean,
        horseback_riding: Faker::Boolean.boolean,
        wifi: Faker::Boolean.boolean,
        pets: Faker::Boolean.boolean,
        toilet: Faker::Boolean.boolean,
        shower: Faker::Boolean.boolean,
        campfire: Faker::Boolean.boolean,
        price: rand(10...1000),
      })
    end

    
    
    puts "Done!"
end


# Listing.first(20).each_with_index do |listing, index|
#   listing.photo.attach(
#     # The string passed to URI.open should be the URL of the image in its bucket.
#     # This sample assumes the bucket name is `benchbnb-seeds`.
#     io: URI.open("https://venture-camp-seeds.s3.us-west-1.amazonaws.com/image#{index + 1}.jpg"), 
#     filename: "image#{index + 1}.jpg"
#   )
# end