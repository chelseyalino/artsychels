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