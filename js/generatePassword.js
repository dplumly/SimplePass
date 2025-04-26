console.log('generatePassword.js loaded');

////////////////////////////////////////////////////////////////////////////
// Logic to generate password
////////////////////////////////////////////////////////////////////////////
function genPass(len, upper, nums, special) {
    const lower = "abcdefghjkmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHJKMNOPQRSTUVWXYZ";
    const numChars = "023456789";
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
    // const len = parseInt(document.getElementById("length").value) || 12;
    const len = document.getElementById("length").valueAsNumber || 12;
    const upper = document.getElementById("uppercase").checked;
    const nums = document.getElementById("numbers").checked;
    const special = document.getElementById("special").checked;

    const pass = genPass(len, upper, nums, special);
    document.getElementById("password").textContent = pass;
});


// Reset the password
document.getElementById('reset').addEventListener('click', () => {
    document.getElementById("length").value = 12;
    document.getElementById("uppercase").checked = true;
    document.getElementById("numbers").checked = true;
    document.getElementById("special").checked = true;
    document.getElementById("password").textContent = "Your password";
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


