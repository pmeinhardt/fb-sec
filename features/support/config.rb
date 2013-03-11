# Configure Facebook test environment.

config = YAML.load_file("config/facebook.yml")

FB_APP_ID = config["app_id"]
FB_SECRET = config["secret"]

at_exit do
  @fb = Koala::Facebook::TestUsers.new(app_id: FB_APP_ID, secret: FB_SECRET)
  @fb.delete_all
end
