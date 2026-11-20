## Before

The project contained four main HTML pages:
- index.html
- about.html
- skills.html
- contact.html

Styles were stored in css/style.css.

JavaScript was combined in js/script.js, which handled navigation,
theme switching, the skills table, and contact-form validation.
Only the theme was saved in Local Storage.

## After

The HTML pages and stylesheet remain in their existing folders.
JavaScript is now separated by role:

| File | Role | Reason for change |
| --- | --- | --- |
| js/settings.js | Loads, validates, and saves settings | Keeps persistence in one place and restores the theme before the page appears. |
| js/navigation.js | Controls the navigation menu | Separates menu behaviour from other features. |
| js/theme.js | Controls theme switching and its button label | Makes theme behaviour easier to locate and maintain. |
| js/skills.js | Stores the skills array and renders the table | Keeps skills data and display logic together. |
| js/contact.js | Validates the contact form and remembers the visitor name | Groups contact-page behaviour together. |
| css/style.css | Contains the website styles | Keeps presentation separate from JavaScript behaviour. |

## Cleanup and Naming

- Replaced the combined script.js with files named after their roles.
- Removed moved code from its original file to avoid duplicate declarations
  and event listeners.
- Updated the HTML script references to use the new filenames.
- Replaced the old portfolio-theme storage logic with one portfolioSettings
  JSON object containing theme, visitorName, and lastVisit.
- Used camelCase for JavaScript names, such as saveSettings and visitorName.
- Renamed the contact-form status variable to formStatus for clarity.
- Updated dark-mode CSS selectors to match the class on the html element.

## Script Loading

settings.js loads in the head without defer so the theme can be restored
before the page becomes visible.

navigation.js, theme.js, skills.js, and contact.js load with defer so
they can access the parsed page elements.