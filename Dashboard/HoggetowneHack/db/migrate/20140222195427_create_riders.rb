class CreateRiders < ActiveRecord::Migration
  def change
    create_table :riders do |t|
      t.date 'date'
      t.integer 'routeNumber'
      t.integer 'stopOn'
      t.time 'timeOn'
      t.integer 'stopOff'
      t.time 'timeOff'
      t.time 'timeDifference'
    end
  end
end
