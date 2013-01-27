Feature: Bookmark

  @online
  @javascript
  Scenario: Read and write encrypted messages on Facebook
    Given I have a bookmarklet
      And I have published my pubkey
      And I go to Facebook messages
     When I start a new conversation
      And a conversation partner has no pubkey
      And I click the bookmarklet
     Then the message contains a hint for him

     When I start a new conversation
      And all conversation partners have a pubkey
      And I click the bookmarklet
     Then I see ...
      And I see ...
     When I type into the message field
      And I hit enter
     Then I see the original message

     When I re-open the last conversation
     Then I see an encrypted message
     When I click the bookmarklet
     Then I see the plaintext message

     When I switch conversations
     Then ...
