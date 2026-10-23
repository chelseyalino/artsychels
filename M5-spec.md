# Module 5 Specification

## 1. Navigation Toggle

Trigger:
The user clicks the menu button.

Expected DOM change:
The navigation links open or close.
The button's aria-expanded value shows whether the menu is open.

Edge cases:
- The user clicks the button many times.
- The user presses the button using the keyboard.
- The navigation links should still work.

Pseudocode:
1. Find the menu button and navigation links.
2. When the button is clicked, open or close the menu.
3. Update the button so it shows if the menu is open.

## Answers to Missing Cases
4. When Escape is pressed, close the menu and update the button.

## 2. Dark Mode

Trigger:
The user clicks the theme button.

Expected DOM change:
Add or remove the dark-mode class on the body.
Change the button text to show which mode the user can switch to.

Edge cases:
- The user clicks the button many times.
- Text and form fields should be readable in both modes.

Pseudocode:
1. Find the theme button.
2. When clicked, switch between light and dark mode.
3. Change the button text to match the next choice.

## Answers to Missing Cases
4. Save the chosen theme and apply it when the page opens again.


## 3. Dynamic Skills Content

Trigger:
The user opens the skills page.

Expected DOM change:
The skills container shows items from an array of objects.
Each item displays a skill name and description.

Edge cases:
- The skills array is empty.
- Running the steps again should not duplicate the skills.
- Other pages do not have a skills container.

Pseudocode:
1. Find the skills container. If it is missing, stop this feature.
2. Make an array of objects with skill names and descriptions.
3. Clear the old content.
4. If the array is empty, show "No skills to display."
5. Otherwise, use an array method to display each skill.

## Answers to Missing Cases
6. Skip any skill with an empty name.


## 4. Contact Form Validation

Trigger:
The user submits the contact form.

Expected DOM change:
Show a specific error beside each invalid field.
Remove old errors when the user submits again.
Show a success message if all fields are valid.

Validation rules:
- Name cannot be empty or contain only spaces.
- Email is required and must have a valid email format.
- Subject cannot be empty or contain only spaces.
- Message cannot be empty or contain only spaces.

Edge cases:
- All fields are empty.
- The user enters only spaces.
- The email address has an invalid format.
- Several fields are invalid at the same time.
- The user corrects mistakes and submits again.
- Other pages do not have a contact form.

Pseudocode:
1. Find the form. If it is missing, stop this feature.
2. Turn off the browser's default validation popups.
3. When submitted, prevent the default submission.
4. Remove old error and success messages.
5. Read each field and remove spaces from both ends.
6. Check for empty fields and an invalid email address.
7. Show a specific error beside each invalid field.
8. If all fields are valid, show "Form checked successfully."
9. Do not say the message was sent because no sending service is connected.

## Answers to Missing Cases
10. Keep the user's answers in the fields after validation.