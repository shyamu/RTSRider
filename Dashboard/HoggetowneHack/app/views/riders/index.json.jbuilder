json.array!(@riders) do |rider|
  json.extract! rider, :id
  json.url rider_url(rider, format: :json)
end
