require 'sinatra'

get '/word/:upc' do |upc|
  sleep 1
  lines = File.foreach('/usr/share/dict/words').first(50000)
  word = lines.sample
  if (upc == 'y')
    word = word.upcase 
  else 
    word = word.capitalize
  end
  [200, word]
end


get '/' do
  File.read('public/index.html')
end