require 'rubygems'
require 'rack/ssl'

use Rack::SSL if ENV['RACK_ENV'] == 'production'
run Rack::Static.new(nil, urls: ['/'], root: 'public', index: 'index.html')
