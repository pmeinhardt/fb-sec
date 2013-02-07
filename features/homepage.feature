Feature: Homepage

  @javascript
  Scenario: Generate a bookmark
    Given I go to the homepage
      And I wait for the bookmark to be generated
     Then I get a public key for copying
      And I get a bookmark link
