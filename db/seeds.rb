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
    Review.destroy_all
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
    

    titles = [
      "Channel Islands National Park",
      "Death Valley National Park",
      "Joshua Tree National Park",
      "Kings Canyon National Park",
      "Lassen Volcanic National Park",
      "Pinnacles National Park",
      "Redwood National and State Parks",
      "Sequoia National Park",
      "Yosemite National Park"
    ]

    descriptions = [
      "Located off the coast of Southern California, the Channel Islands are a unique and pristine wilderness that is accessible only by boat or plane. The park consists of five islands - Anacapa, Santa Cruz, Santa Rosa, San Miguel, and Santa Barbara - each with its own distinctive landscape and wildlife. Visitors can explore the islands by hiking, kayaking, or snorkeling, and can spot a variety of marine life, including sea lions, dolphins, whales, and colorful fish. The islands also feature historic lighthouses, rugged cliffs, and expansive views of the Pacific Ocean.",

      "Situated in the Mojave Desert, Death Valley is one of the hottest and driest places on earth, with temperatures that can exceed 120 degrees Fahrenheit in the summer. Despite its harsh environment, the park is home to a surprising diversity of plants and animals, including coyotes, bighorn sheep, and rare desert wildflowers. Visitors can explore the park's many natural wonders, such as the towering Mesquite Flat Sand Dunes, the Badwater Basin salt flats, and the colorful Artist's Palette rock formations. The park also features several historic sites, such as the ghost town of Rhyolite and the Scotty's Castle mansion.",

      "Named for the iconic Joshua trees that dot its landscape, Joshua Tree National Park is a desert wonderland that spans both the Mojave and Colorado Deserts. The park features a variety of unique rock formations, such as the massive boulder piles of Hidden Valley and the Skull Rock formation, which looks like a human skull. Visitors can hike the park's many trails, rock climb on its world-class formations, or stargaze at night in one of the darkest skies in the country. The park also features several historic sites, including the Keys Ranch, a preserved homestead from the early 20th century.",

      "Known for its deep canyons, towering sequoia trees, and crystal-clear rivers, Kings Canyon offers a wide range of outdoor activities for visitors. The park's signature feature is the Kings Canyon itself, a massive gorge that is deeper than the Grand Canyon in some places. Visitors can hike through the park's stunning forests, fish for trout in its rivers and lakes, or explore its many waterfalls, such as the 400-foot-tall Grizzly Falls. The park also offers backpacking trips into the remote backcountry, where visitors can experience some of the most pristine wilderness in the Sierra Nevada mountains.",

      "Lassen Volcanic is a unique and fascinating landscape of geothermal features, such as bubbling mud pots, steaming fumaroles, and boiling hot springs. The park also features several impressive volcanic peaks, such as Lassen Peak, which erupted in 1915 and is still considered an active volcano. Visitors can hike through the park's volcanic features, such as the Bumpass Hell trail, or explore its crystal-clear lakes and streams, such as the popular Manzanita Lake. The park also offers opportunities for camping, fishing, and winter sports such as skiing and snowshoeing.",

      "This park is known for its towering rock spires, caves, and other geological formations, which were formed by an ancient volcano. Visitors can hike the park's many trails, which range from easy strolls to challenging rock scrambles, or explore its network of underground caves, which are home to bats and other wildlife. The park also offers opportunities for rock climbing, bird watching, and stargazing, and is home to a variety of rare and endangered species",

      "Located on the northern coast of California, this park is home to some of the tallest and oldest trees on earth - the towering coast redwoods. Visitors can explore the park's ancient forests, hike through its lush river valleys, or stroll along its scenic coastline. The park also features a variety of wildlife, such as elk, black bears, and harbor seals, as well as several historic sites, including the Kuchel Visitor Center and the Lady Bird Johnson Grove.",

      "This park is home to the largest trees on earth - the massive sequoias, which can grow to be more than 300 feet tall and over 2,000 years old. Visitors can hike through the park's stunning forests, which also include groves of giant redwoods and other tree species, or explore its deep canyons and rugged peaks, such as Mount Whitney, the highest point in the contiguous United States. The park also offers opportunities for camping, fishing, and winter sports, as well as several historic sites, such as the Giant Forest Museum and the Tunnel Log.",

      "One of the most iconic parks in the United States, Yosemite is known for its towering granite cliffs, thundering waterfalls, and stunning alpine scenery. Visitors can hike the park's many trails, including the famous Mist Trail, which leads to the base of Yosemite Falls, or climb its world-famous rock formations, such as El Capitan and Half Dome. The park also features several historic sites, such as the Ahwahnee Hotel and the Yosemite Valley Chapel, as well as opportunities for camping, fishing, and winter sports such as skiing and snowshoeing."

    ]

    coordinates = [  
      [34.0060, -119.7785],
      [36.5323, -116.9325],  
      [33.8734, -115.9010],  
      [36.8879, -118.5551],  
      [40.4977, -121.4207],  
      [36.4906, -121.1825],  
      [41.2132, -124.0046],  
      [36.4864, -118.5658],  
      [37.8651, -119.5383],  
    ]

    city = [
      "Ventura",
      "Lone Pine",
      "Twentynine Palms",
      "Three Rivers",
      "Mineral",
      "Soledad",
      "Crescent City",
      "Three Rivers",
      "Yosemite Valley"
    ]

    channel_islands_review = [
      {body: "We had an incredible day kayaking with the sea lions and exploring the island! It was truly a once-in-a-lifetime experience.", rating: rand(3..5), author_id: 3},
      {body: "The hiking trails on the island are stunning, with incredible views of the ocean and the mainland. Definitely worth a visit!", rating: rand(3..5), author_id: 7},
      {body: "The snorkeling in the kelp forests was amazing - we saw so many different types of fish and other sea creatures.", rating: rand(3..5), author_id: 8},
      {body: "The boat ride to the island was a bit choppy, but it was worth it to see the beautiful coastline and the sea caves.", rating: rand(3..5), author_id: 2},
    ]

    death_valley_review = [
      {body:"The sand dunes were amazing - it felt like we were in another world. Make sure to bring sunscreen and plenty of water!", rating: rand(3..5), author_id: 1},
      {body:"The night sky in Death Valley is something you have to see to believe - the stars are absolutely incredible.", rating: rand(3..5), author_id: 4},
      {body:"The drive through the park was stunning, with endless vistas of desert and mountains. Definitely one of my favorite national parks.", rating: rand(3..5), author_id: 6},
      {body:"The heat in the summer can be brutal, but if you come prepared and stay hydrated, you'll have a great time. Just make sure to check for road closures before you go!", rating: rand(3..5), author_id: 9}
    ]

    joshua_tree_review = [
      {body: "The rock formations are incredible - we spent hours bouldering and exploring the park.", rating: rand(3..5), author_id: 10},
      {body: "The sunsets in Joshua Tree are some of the most beautiful I've ever seen. Make sure to bring a camera!", rating: rand(3..5), author_id: 1},
      {body: "We saw so much wildlife - bighorn sheep, jackrabbits, and even a coyote. It was an unforgettable experience.", rating: rand(3..5), author_id: 5},
      {body: "The park is huge, so make sure to plan ahead and decide which areas you want to explore. It's worth the effort!", rating: rand(3..5), author_id: 7}
    ]

    kings_canyon_review = [
      {body:"The trails in the park are some of the most beautiful I've ever hiked. Definitely a hidden gem of California!", rating: rand(3..5), author_id: 7},
      {body:"The views of the mountains and the canyons are breathtaking - it's like something out of a movie.", rating: rand(3..5), author_id: 6},
      {body:"The campground was clean and well-maintained, with plenty of space between sites. We had a great time!", rating: rand(3..5), author_id: 2},
      {body:"The park can be a bit challenging to navigate, so make sure to bring a good map and plan ahead. But once you're there, it's absolutely worth it.", rating: rand(3..5), author_id: 1}
    ]

    lassen_volcanic_review = [
      {body:"The hot springs and mud pots were so unique - I've never seen anything like it. Definitely worth a visit.", rating: rand(3..5), author_id: 1},
      {body:"The hiking trails are well-maintained and offer incredible views of the park's volcanic landscapes.", rating: rand(3..5), author_id: 9},
      {body:"The park was surprisingly uncrowded, even during peak season. It was a great escape from the crowds of other national parks.", rating: rand(3..5), author_id: 2},
      {body:"The campground was quiet and peaceful, with plenty of trees and wildlife. We loved our stay here.", rating: rand(3..5), author_id: 3}
    ]

    pinacles_review = [
      {body:"The caves were so cool - we felt like we were on a real adventure! Just make sure to bring a headlamp.", rating: rand(3..5), author_id: 3},
      {body:"The hiking trails are challenging but rewarding, with incredible views of the park's rock formations and wildlife.", rating: rand(3..5), author_id: 5},
      {body:"The campground was clean and quiet, with plenty of space between sites. We had a great time.", rating: rand(3..5), author_id: 2},
      {body:"Soooo fun!", rating: rand(3..5), author_id: 1}
    ]

    redwood_national_review = [
      {body:"Walking among the giant redwoods is an awe-inspiring experience. It's like nothing else you've ever seen.", rating: rand(3..5), author_id: 6},
      {body:"The coastline in the park is beautiful, with rugged cliffs and incredible views of the ocean. Don't miss it!", rating: rand(3..5), author_id: 8},
      {body:"The park is great for camping - there are plenty of sites with amenities and beautiful surroundings. We loved our stay here.", rating: rand(3..5), author_id: 9},
      {body:"The park rangers were friendly and knowledgeable, and offered great tips on hikes and other activities. Highly recommend!", rating: rand(3..5), author_id: 5}
    ]

    sequoia_national_review = [
      {body:"The giant sequoias are unbelievable - it's hard to believe that trees can grow so large. Make sure to take the time to see them up close.", rating: rand(3..5), author_id: 3},
      {body:"The park has some amazing hikes, with beautiful views of the mountains and the valleys. Definitely worth the effort.", rating: rand(3..5), author_id: 8},
      {body:"The Crystal Cave tour was a highlight of our trip - it was like entering another world. Make sure to book your tour ahead of time!", rating: rand(3..5), author_id: 4},
      {body:"The wildlife in the park is incredible - we saw bears, deer, and even a mountain lion. Just make sure to keep a safe distance!", rating: rand(3..5), author_id: 2}
    ]

    yosemite_national_review = [
      {body:"The views of Half Dome and El Capitan are some of the most iconic in the world. Make sure to bring a camera!", rating: rand(3..5), author_id: 2},
      {body:"The park is huge, with so much to see and do. We spent a week here and still didn't get to everything.", rating: rand(3..5), author_id: 1},
      {body:"The Mist Trail to Vernal Falls is a must-do hike - the views are incredible, and the mist from the falls is refreshing on a hot day.", rating: rand(3..5), author_id: 7},
      {body:"The park can be crowded, but if you're willing to venture off the beaten path, you can find some amazing spots to enjoy the park in peace.", rating: rand(3..5), author_id: 8}
    ]



    reviews = [channel_islands_review, death_valley_review, joshua_tree_review, kings_canyon_review, lassen_volcanic_review, pinacles_review, redwood_national_review, sequoia_national_review, yosemite_national_review]

    puts "Creating listings & reviews..."
    titles.each_with_index do |title, i|
      Listing.create!({
        host_id: 1,
        longitude: coordinates[i][1],
        latitude: coordinates[i][0],
        title: title,
        description: descriptions[i],
        city: city[i],
        state: "California",
        country: "United States",
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
        price: rand(100..175),
      })
      
      reviews[i].each do |review|
        Review.create!(
          body: review[:body],
          rating: review[:rating],
          author_id: review[:author_id],
          listing_id: i + 1
        )
      end
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