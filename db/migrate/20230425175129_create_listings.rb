class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :host, null: false, foreign_key: {to_table: :users}
      t.string :title, null: false
      t.string :description, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.integer :capacity, null: false
      t.boolean :hiking, default: false
      t.boolean :biking, default: false
      t.boolean :rock_climbing, default: false
      t.boolean :fishing, default: false
      t.boolean :horseback_riding, default: false
      t.boolean :wifi, default: false
      t.boolean :pets, default: false
      t.boolean :toilet, default: false
      t.boolean :shower, default: false
      t.boolean :campfire, default: false
      t.float :price, null: false
      t.float :longitude, null: false
      t.float :latitude, null: false


      t.timestamps
    end
  end
end
