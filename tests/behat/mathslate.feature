@editor @editor_atto @atto @atto_mathslate @_bug_phantomjs
Feature: Atto mathslate editor
  To teach maths to students, I need to write TeX expressions

  Background:
    Given I log in as "admin"
    And I navigate to "Plugins > Text editors > Atto HTML edito > Atto toolbar settings" in site administration
    And I set the field "Toolbar config" to "other = html, mathslate"
    And I press "Save changes"
    And I open my profile in edit mode
    # Set field on the bottom of page, so mathslate editor dialogue is visible.
    And I expand all fieldsets
    And I set the field "Picture description" to "Test"
    And I set the field "Description" to "Test Mathslate"

  @javascript
  Scenario: Create a mathematical expression
    When I select the text in the "Description" Atto editor
    And I click on "Mathslate" "button"
    And I click on "[title='Greek alphabet and symbols']" "css_element"
    And I click on "[title='\\infty']" "css_element"
    And I wait "3" seconds
    And I click on "Display TeX" "button"
    And I wait "3" seconds
    And I click on "Update profile" "button"
    And I follow "Profile" in the user menu
    Then "\infty" "text" should exist
