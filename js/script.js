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