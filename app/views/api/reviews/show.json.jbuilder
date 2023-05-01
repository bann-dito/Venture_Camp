json.review do
    json.extract! @review, :id, :rating, :body, :listing_id, :author_id
end

json.user do
    json.extract! @review.author, :id, :username
end

json.listing do
    json.extract! @review.listing, :id, :host_id, :title
end


