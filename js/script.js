// Aayush Mehmi, 6/14/2026

// The loot array is the source of truth for all loot data.
const loot = [];

document.getElementById("addLootButton").addEventListener("click", addLoot);
document.getElementById("splitLootButton").addEventListener("click", splitLoot);
document.getElementById("partySize").addEventListener("input", updateUI);

updateUI();

function addLoot() {

    const name = document.getElementById("lootName").value;
    const value = parseFloat(document.getElementById("lootValue").value);
    const quantity = parseInt(document.getElementById("lootQuantity").value);

    // Validation protects the array from invalid state.
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

    if (isNaN(quantity) || quantity < 1) {
        document.getElementById("message").textContent =
            "Please enter a valid quantity.";
        return;
    }

    // Each item is stored as a plain object literal with name, value, and quantity.
    loot.push({
        name: name,
        value: value,
        quantity: quantity
    });

    document.getElementById("message").textContent =
        "Loot added successfully.";

    document.getElementById("lootName").value = "";
    document.getElementById("lootValue").value = "";
    document.getElementById("lootQuantity").value = "";

    updateUI();
}

function removeLoot(index) {

    // splice removes the correct item from the array by its position.
    loot.splice(index, 1);

    updateUI();
}

function splitLoot() {

    // The button does not calculate directly.
    // It only asks the app to refresh from the current state.
    updateUI();
}

function updateUI() {

    const partySize =
        parseInt(document.getElementById("partySize").value);

    const lootRows = document.getElementById("lootRows");

    let total = 0;

    lootRows.innerHTML = "";

    // This loop renders loot and calculates total from the array.
    for (let i = 0; i < loot.length; i++) {

        total += loot[i].value * loot[i].quantity;

        let row = document.createElement("div");
        row.className = "loot-row";

        let nameCell = document.createElement("div");
        nameCell.className = "loot-cell";
        nameCell.innerText = loot[i].name;

        let valueCell = document.createElement("div");
        valueCell.className = "loot-cell";
        valueCell.innerText = "$" + loot[i].value.toFixed(2);

        let quantityCell = document.createElement("div");
        quantityCell.className = "loot-cell";
        quantityCell.innerText = loot[i].quantity;

        let actionCell = document.createElement("div");
        actionCell.className = "loot-cell loot-actions";

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";

        removeBtn.addEventListener("click", function () {
            removeLoot(i);
        });

        actionCell.appendChild(removeBtn);

        row.appendChild(nameCell);
        row.appendChild(valueCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);

        lootRows.appendChild(row);
    }

    const partyIsValid = !isNaN(partySize) && partySize >= 1;
    const lootExists = loot.length > 0;

    document.getElementById("totalLoot").textContent =
        total.toFixed(2);

    document.getElementById("finalTotal").textContent =
        total.toFixed(2);

    if (partyIsValid && lootExists) {
        document.getElementById("lootPerMember").textContent =
            (total / partySize).toFixed(2);
    } else {
        document.getElementById("lootPerMember").textContent =
            "0.00";
    }

    // Empty state and results visibility are controlled with CSS classes.
    if (lootExists) {
        document.getElementById("noLootMessage").classList.add("hidden");
        document.getElementById("totalRow").classList.remove("hidden");
    } else {
        document.getElementById("noLootMessage").classList.remove("hidden");
        document.getElementById("totalRow").classList.add("hidden");
    }

    if (partyIsValid && lootExists) {
        document.getElementById("resultsPanel").classList.remove("hidden");
        document.getElementById("splitLootButton").disabled = false;
        document.getElementById("splitMessage").textContent = "";
    } else {
        document.getElementById("resultsPanel").classList.add("hidden");
        document.getElementById("splitLootButton").disabled = true;

        if (!partyIsValid && lootExists) {
            document.getElementById("splitMessage").textContent =
                "Please enter a valid party size.";
        } else {
            document.getElementById("splitMessage").textContent = "";
        }
    }
}