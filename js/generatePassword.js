console.log('generatePassword.js loaded');

////////////////////////////////////////////////////////////////////////////
// Logic to generate password
function genPass(len, upper, nums, special) {
    const lower = "abcdefghjkmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHJKMNPQRSTUVWXYZ";
    const numChars = "23456789";
    const specialChars = "!@#$%&*()-_=+[]{};:,.<>?";
    let chars = lower;

    if (upper) chars += upperChars;
    if (nums) chars += numChars;
    if (special) chars += specialChars;

    let pass = "";
    
    for (let i = 0; i < len; i++) {
        const random = Math.floor(Math.random() * chars.length);
        pass += chars[random];
    }
    return pass;
}
    
// Generate the password
document.getElementById('generate').addEventListener('click', () => {
    const len = document.getElementById("length").valueAsNumber || 12;
    const upper = document.getElementById("uppercase").checked;
    const nums = document.getElementById("numbers").checked;
    const special = document.getElementById("special").checked;

    const pass = genPass(len, upper, nums, special);
    document.getElementById("password").textContent = pass;
    console.log('generate');
});

// Reset the password
document.getElementById('reset').addEventListener('click', () => {
    document.getElementById("length").value = 12;
    document.getElementById("uppercase").checked = true;
    document.getElementById("numbers").checked = true;
    document.getElementById("special").checked = true;
    document.getElementById("password").textContent = "Your password";
    console.log('reset');
});

// Copy the password
document.getElementById('copy').addEventListener('click', () => {
    const password = document.getElementById('password').textContent;
    navigator.clipboard.writeText(password)
        .then(() => {
            console.log('copied');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
});


////////////////////////////////////////////////////////////////////////////
// Lottie animation 
document.getElementById('copy').addEventListener('click', () => {
    const container = document.getElementById('lottie-container');
    container.innerHTML = ''; 

    const anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'lottie/data.json'
    });
});


////////////////////////////////////////////////////////////////////////////
// Saves the charater count of the password
const lengthInput = document.getElementById('length');

// Load saved length on popup open
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['userInput'], (result) => {
        if (result.userInput) {
            lengthInput.value = result.userInput;
            console.log('Loaded saved length:', result.userInput);
        }
    });
});

// Save new value on change
lengthInput.addEventListener('input', () => {
    const newLength = parseInt(lengthInput.value, 10);
    if (!isNaN(newLength)) {
        chrome.storage.local.set({ userInput: newLength }, () => {
            console.log('Saved new length:', newLength);
        });
    }
});


////////////////////////////////////////////////////////////////////////////
// Select all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Save on change
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Save current states
        chrome.storage.local.set({
            uppercase: document.getElementById('uppercase').checked,
            numbers: document.getElementById('numbers').checked,
            special: document.getElementById('special').checked
        }, () => {
            console.log('Saved checkbox states');
        });
    });
});

// Load saved states on popup open
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['uppercase', 'numbers', 'special'], (result) => {
        if (typeof result.uppercase === 'boolean') {
            document.getElementById('uppercase').checked = result.uppercase;
        }
        if (typeof result.numbers === 'boolean') {
            document.getElementById('numbers').checked = result.numbers;
        }
        if (typeof result.special === 'boolean') {
            document.getElementById('special').checked = result.special;
        }
    });
});

