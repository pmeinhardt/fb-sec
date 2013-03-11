Given /^I have a bookmarklet$/ do
  step "I go to the homepage"
  step "I wait for the bookmark to be generated"

  @bookmark = find("#bookmarklet")["href"]
  @pubkey = find_field("pubkey").value
end

Given /^I am signed in to Facebook$/ do
  @fb = Koala::Facebook::TestUsers.new(app_id: FB_APP_ID, secret: FB_SECRET)

  @users = @fb.create_network(3)
  @me = @users.pop

  visit @me["login_url"]
  fill_in "email", with: @me["email"]
  fill_in "pass", with: @me["password"]
  click_button "Log In"
end

Given /^I have made my pubkey available$/ do
  visit "https://www.facebook.com/me/info"
  click_link "quotes_edit_button"
  fill_in "quotes", with: @pubkey
  find("form[rel=async] input[type=submit]").click
  find("#pagelet_quotes .profileText:contains('#{@pubkey}')")
end

When /^I go to Facebook messages$/ do
  # just to make the scenario more comprehensible
end

When /^I start a new conversation$/ do
  visit "https://www.facebook.com/messages/new"
end

When /^a conversation partner has no pubkey$/ do
  debugger
  @users.first
end
