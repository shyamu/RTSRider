class CreateRiders < ActiveRecord::Migration
  def change
    create_table :riders do |t|
      t.integer 'ID'
      t.date 'Date'
      t.integer 'Route_Number'
      t.integer 'Stop_On'
      t.time 'Time_On'
      t.integer 'Stop_Off'
      t.time 'Time_Off'
      t.time 'Time_Difference'
    end
  end
end
