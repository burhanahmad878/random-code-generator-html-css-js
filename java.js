// Character sets
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "~!@#$%^&*()_+/";

// Select elements
const passBox = document.getElementById("pass-box");
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case");
const lowerInput = document.getElementById("lower-case");
const numberInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");
const btn = document.getElementById("btn");
const copyBtn = document.getElementById("copy-btn");
const strengthText = document.getElementById("strength-text");

// Generate Password
const generatePassword = () => {
    let password = "";
    const length = Number(totalChar.value);

    if (length < 2) {
        alert("Password length must be at least 2");
        return;
    }

    let allChars = "";
    if (upperInput.checked) allChars += upperSet;
    if (lowerInput.checked) allChars += lowerSet;
    if (numberInput.checked) allChars += numberSet;
    if (symbolInput.checked) allChars += symbolSet;

    if (allChars === "") {
        alert("Select at least one option!");
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    passBox.innerText = password;

    // Check strength
    checkStrength(password);

    // Save to history
    history.unshift(password); // add at top

    // keep only last 5 passwords
    if (history.length > 5) history.pop();

    // save in browser
    localStorage.setItem("passwordHistory", JSON.stringify(history));

    // update UI
    updateHistoryUI();
};
const historyBox = document.getElementById("history-box");

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];

// Function to update UI
const updateHistoryUI = () => {
    historyBox.innerHTML = history.map(p => `<div>${p}</div>`).join("");
};

// Call once on load
updateHistoryUI();
// Password Strength Checker
const checkStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        strengthText.innerText = "Strength: Weak";
        strengthText.style.color = "red";
    } else if (strength <= 4) {
        strengthText.innerText = "Strength: Medium";
        strengthText.style.color = "orange";
    } else {
        strengthText.innerText = "Strength: Strong";
        strengthText.style.color = "green";
    }
};

// Copy to Clipboard
copyBtn.addEventListener("click", () => {
    const password = passBox.innerText;

    if (!password) return;

    navigator.clipboard.writeText(password);
    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 2000);
});

// Events
btn.addEventListener("click", generatePassword);
totalChar.addEventListener("input", generatePassword);
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Initial run
generatePassword();