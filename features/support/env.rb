require 'rubygems'
require 'capybara'
require 'capybara/dsl'
require 'capybara/cucumber'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'rack'

ENV['RACK_ENV'] ||= 'test'

# Load the Rack app used for testing our static page.
path = File.expand_path('../../../config.ru', __FILE__)
app = Rack::Builder.parse_file(path)[0]

# Add a driver for Chrome.
Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

# Configure Capybara.
Capybara.configure do |config|
  # Assign an app to run.
  config.app = app

  # Configure the default port.
  config.server_port = 9292

  # Driver to use for JavaScript testing.
  config.javascript_driver = :chrome

  # Ignore invisible elements on the page.
  config.ignore_hidden_elements = true
end
