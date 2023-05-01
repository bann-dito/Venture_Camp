class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :listing, null: false, foreign_key: { to_table: :listings }, index: false
      t.integer :rating, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :reviews, [:listing_id, :author_id], unique: true
  end
end
