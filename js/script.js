const settingsKey = "portfolioSettings";

const defaultSettings = {
    theme: "light",
    visitorName: "",
    lastVisit: ""
};

let settings = { ...defaultSettings };

try {
    const savedSettings = localStorage.getItem(settingsKey);

    if (savedSettings) {
        const storedSettings = JSON.parse(savedSettings);

        if (
            !storedSettings ||
            typeof storedSettings !== "object" ||
            Array.isArray(storedSettings)
        ) {
            throw new Error("Invalid settings object.");
        }

        settings = {
            theme: storedSettings.theme === "dark" ? "dark" : "light",
            visitorName:
                typeof storedSettings.visitorName === "string"
                    ? storedSettings.visitorName
                    : "",
            lastVisit:
                typeof storedSettings.lastVisit === "string" &&
                Number.isFinite(Date.parse(storedSettings.lastVisit))
                    ? storedSettings.lastVisit
                    : ""
        };
    }
} catch (error) {
    console.warn("Could not restore settings. Using defaults.", error);
    settings = { ...defaultSettings };
}

function saveSettings() {
    try {
        localStorage.setItem(settingsKey, JSON.stringify(settings));
    } catch (error) {
        console.warn("Could not save settings.", error);
    }
}

document.documentElement.classList.toggle(
    "dark-mode",
    settings.theme === "dark"
);

settings.lastVisit = new Date().toISOString();
saveSettings();

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

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-nav");
    const themeButton = document.getElementById("theme-toggle");
    const skillsList = document.getElementById("skills-list");
    const contactForm = document.getElementById("contact-form");

    if (menuButton && navigation) {
        function setMenuOpen(isOpen) {
            navigation.classList.toggle("is-open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
        }

        menuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.contains("is-open");
            setMenuOpen(!isOpen);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navigation.classList.contains("is-open")) {
                setMenuOpen(false);
                menuButton.focus();
            }
        });

        setMenuOpen(false);
        menuButton.classList.add("is-ready");
        navigation.classList.add("menu-ready");
    }

    function applyTheme(isDark) {
        document.documentElement.classList.toggle("dark-mode", isDark);

        if (themeButton) {
            themeButton.textContent = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";
        }
    }

    applyTheme(settings.theme === "dark");

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            settings.theme = settings.theme === "dark" ? "light" : "dark";
            applyTheme(settings.theme === "dark");
            saveSettings();
        });
    }

    if (skillsList) {
        const validSkills = skills.filter(function (skill) {
            return skill.name.trim() !== "";
        });

        skillsList.replaceChildren();

        if (validSkills.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 3;
            cell.textContent = "No skills to display.";

            row.appendChild(cell);
            skillsList.appendChild(row);
        } else {
            validSkills.forEach(function (skill) {
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
    }

    if (contactForm) {
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const subjectField = document.getElementById("subject");
        const messageField = document.getElementById("message");
        const formStatus = document.getElementById("form-status");

        contactForm.noValidate = true;
        nameField.value = settings.visitorName;

        function showFieldError(field, message) {
            const errorMessage = document.getElementById(`${field.id}-error`);

            errorMessage.textContent = message;
            field.setAttribute("aria-invalid", String(message !== ""));
        }

        nameField.addEventListener("input", function () {
            settings.visitorName = nameField.value;
            saveSettings();
        });

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            formStatus.textContent = "";

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

            formStatus.textContent =
                "Form checked successfully. No message has been sent.";
        });
    }
});