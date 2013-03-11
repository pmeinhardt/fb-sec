Given /^I go to the homepage$/ do
  visit "/"
end

Given /^I wait for the bookmark to be generated$/ do
  timeout = 10.0
  started = Time.now

  begin
    find_field("pubkey").value.should_not be_empty
  rescue => e
    raise e if (Time.now - started) > timeout
    sleep 0.1
    retry
  end
end

Then /^I get a public key for copying$/ do
  value = find_field("pubkey").value
  value.should match(/\[\[fbskey\:[a-z0-9]+\|10001\]\]/)
end

Then /^I get a bookmark link$/ do
  anchor = find("#bookmarklet")
  anchor["href"].should match(/\Ajavascript:(.*)\z/)
end
