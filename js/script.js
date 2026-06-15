// Aayush Mehmi, 6/14/2026

// Store all loot items so data persists between button clicks
const loot = [];

// Event listeners for both buttons
document.getElementById("addLootButton").addEventListener("click", addLoot);
document.getElementById("splitLootButton").addEventListener("click", splitLoot);

function addLoot() {

    const name = document.getElementById("lootName").value;
    const value = parseFloat(document.getElementById("lootValue").value);

    // Validate user input before adding loot
    if (name === "") {
        document.getElementById("message").textContent =
            "Please enter a loot name.";
        return;
    }

    if (isNaN(value) || value < 0) {
        document.getElementById("message").textContent =
            "Please enter a valid loot value.";
        return;
    }

    // Add the new loot object into the array
    loot.push({
        name: name,
        value: value
    });

    document.getElementById("message").textContent =
        "Loot added successfully.";

    // Clear inputs after adding loot
    document.getElementById("lootName").value = "";
    document.getElementById("lootValue").value = "";

    renderLoot();
}

function renderLoot() {

    let listHTML = "";
    let total = 0;

    // Loop through the array to display loot and calculate total value
    for (let i = 0; i < loot.length; i++) {

        listHTML +=
            "<li>" +
            loot[i].name +
            ": $" +
            loot[i].value.toFixed(2) +
            "</li>";

        total += loot[i].value;
    }

    document.getElementById("lootList").innerHTML = listHTML;

    document.getElementById("runningTotal").textContent =
        total.toFixed(2);
}

function splitLoot() {

    const partySize =
        parseInt(document.getElementById("partySize").value);

    // Validate party size and calculate each member's share
    if (partySize < 1 || isNaN(partySize)) {

        document.getElementById("splitMessage").textContent =
            "Please enter a valid party size.";

        return;
    }

    if (loot.length === 0) {

        document.getElementById("splitMessage").textContent =
            "No loot has been entered.";

        return;
    }

    let total = 0;

    // Loop through the array and calculate total loot value
    for (let i = 0; i < loot.length; i++) {
        total += loot[i].value;
    }

    const splitAmount = total / partySize;

    document.getElementById("finalTotal").textContent =
        total.toFixed(2);

    document.getElementById("lootPerMember").textContent =
        splitAmount.toFixed(2);

    document.getElementById("splitMessage").textContent = "";
}