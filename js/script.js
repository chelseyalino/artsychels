// Keep the menu's appearance and accessibility state in sync.
function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
}

// Let users open and close the menu with the same button.
function toggleMenu() {
    const isOpen = navigation.classList.contains("is-open");
    setMenuOpen(!isOpen);
}

// Let keyboard users close the menu and return to its button.
function handleMenuKey(event) {
    if (event.key === "Escape" &&
        navigation.classList.contains("is-open")) {
        setMenuOpen(false);
        menuButton.focus();
    }
}

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", handleMenuKey);

    setMenuOpen(false);
    menuButton.classList.add("is-ready");
    navigation.classList.add("menu-ready");
}
const themeButton = document.getElementById("theme-toggle");

// Keep the colors and button label matched to the chosen theme.
function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    if (themeButton) {
        themeButton.textContent = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";
    }
}

// Remember the user's choice when browser storage is available.
function toggleTheme() {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);

    try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch {
        // Theme switching still works if storage is unavailable.
    }
}

// Restore the saved choice without stopping other features if storage fails.
function loadTheme() {
    try {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark" || savedTheme === "light") {
            applyTheme(savedTheme === "dark");
            return;
        }
    } catch {
        // Use the current page theme if storage is unavailable.
    }

    applyTheme(document.body.classList.contains("dark-mode"));
}

loadTheme();

if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
}
const skills = [
    { name: "Graphic Design", category: "Creative", level: "Competent" },
    { name: "Digital Illustration", category: "Creative", level: "Competent" },
    { name: "Video Editing", category: "Creative", level: "Proficient" },
    { name: "Creative Direction", category: "Creative", level: "Proficient" },
    { name: "Content Creation", category: "Creative", level: "Competent" },
    { name: "3D Modeling", category: "Creative", level: "Beginner" },
    { name: "2D Animation", category: "Creative", level: "Beginner" },
    { name: "C+", category: "Technical", level: "Beginner" },
    { name: "HTML", category: "Technical", level: "Beginner" }
];

// Keep the skills in one list so updates do not require editing HTML rows.
function renderSkills() {
    const skillsList = document.getElementById("skills-list");

    if (!skillsList) {
        return;
    }

    skillsList.replaceChildren();

    const validSkills = skills.filter(function hasName(skill) {
        return skill.name.trim() !== "";
    });

    if (validSkills.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 3;
        cell.textContent = "No skills to display.";
        row.appendChild(cell);
        skillsList.appendChild(row);
        return;
    }

    // Give each listed skill its own row in the existing table.
    validSkills.forEach(function addSkillRow(skill) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const levelCell = document.createElement("td");

        nameCell.textContent = skill.name;
        categoryCell.textContent = skill.category;
        levelCell.textContent = skill.level;

        row.append(nameCell, categoryCell, levelCell);
        skillsList.appendChild(row);
    });
}

renderSkills();
const contactForm = document.getElementById("contact-form");

// Give each field its own feedback so users know what to correct.
function showFieldError(field, message) {
    const error = document.getElementById(field.id + "-error");

    error.textContent = message;
    field.setAttribute("aria-invalid", String(message !== ""));
}

// Check every field before showing success and keep the user's entries.
function validateContactForm(event) {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");
    const status = document.getElementById("form-status");

    status.textContent = "";

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();

    let emailError = "";

    if (email === "") {
        emailError = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError = "Please enter an email like name@example.com.";
    }

    showFieldError(
        nameField,
        name === "" ? "Please enter your name." : ""
    );

    showFieldError(emailField, emailError);

    showFieldError(
        subjectField,
        subject === "" ? "Please enter a subject." : ""
    );

    showFieldError(
        messageField,
        message === "" ? "Please enter a message." : ""
    );

    const firstInvalid = contactForm.querySelector(
        '[aria-invalid="true"]'
    );

    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    status.textContent =
        "Form checked successfully. No message has been sent.";
}

if (contactForm) {
    contactForm.addEventListener("submit", validateContactForm);
    contactForm.noValidate = true;
}