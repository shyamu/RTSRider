class CreateRiders < ActiveRecord::Migration
  def change
    create_table :riders do |t|
      t.integer 'ID'
      t.string 'Stop_On'
      t.string 'Time_On'
      t.string 'Stop_Off'
      t.string 'Time_Off'
      t.string 'Time_Difference'
    end
  end
end
