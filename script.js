let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [

    {
        type: "Lost",
        name: "College ID Card",
        category: "Documents",
        location: "Library",
        date: "2026-09-16",
        description: "Student ID card with college details.",
        contact: "student@example.com"
    },

    {
        type: "Found",
        name: "Black Notebook",
        category: "Books",
        location: "Canteen",
        date: "2026-09-16",
        description: "Black notebook found near the canteen.",
        contact: "9876543210"
    },

    {
        type: "Found",
        name: "USB Drive",
        category: "Electronics",
        location: "CSE Lab",
        date: "2026-09-15",
        description: "Small black USB drive.",
        contact: "9876501234"
    }

];


// SAVE DATA

function saveItems() {
    localStorage.setItem("lostFoundItems", JSON.stringify(items));
}


// DISPLAY ITEMS

function displayItems(list = items) {

    const container = document.getElementById("itemsContainer");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <p>No items found.</p>
        `;

        return;
    }

    list.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "item-card";

        card.innerHTML = `

            <span class="status ${item.type.toLowerCase()}">
                ${item.type}
            </span>

            <h3>${item.name}</h3>

            <p><strong>Category:</strong> ${item.category}</p>

            <p><strong>Location:</strong> ${item.location}</p>

            <p><strong>Date:</strong> ${item.date}</p>

            <p><strong>Description:</strong>
            ${item.description}</p>

            <p><strong>Contact:</strong>
            ${item.contact}</p>

            <button
                class="delete-btn"
                onclick="deleteItem(${index})">
                Delete
            </button>

        `;

        container.appendChild(card);

    });
}


// ADD NEW ITEM

document.getElementById("itemForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const newItem = {

            type: document.getElementById("type").value,

            name: document.getElementById("itemName").value,

            category: document.getElementById("category").value,

            location: document.getElementById("location").value,

            date: document.getElementById("date").value,

            description:
                document.getElementById("description").value,

            contact:
                document.getElementById("contact").value

        };

        items.push(newItem);

        saveItems();

        displayItems();

        alert("Item reported successfully!");

        document.getElementById("itemForm").reset();

        document.getElementById("items")
            .scrollIntoView({ behavior: "smooth" });

    }
);


// SEARCH

document.getElementById("search").addEventListener(
    "input",
    function() {

        const query = this.value.toLowerCase();

        const filtered = items.filter(item =>

            item.name.toLowerCase().includes(query) ||

            item.category.toLowerCase().includes(query) ||

            item.location.toLowerCase().includes(query) ||

            item.type.toLowerCase().includes(query)

        );

        displayItems(filtered);

    }
);


// DELETE

function deleteItem(index) {

    if (confirm("Delete this item?")) {

        items.splice(index, 1);

        saveItems();

        displayItems();
        
        function updateDashboard() {

    document.getElementById("totalItems").textContent = items.length;

    document.getElementById("totalLost").textContent =
        items.filter(item => item.type === "Lost").length;

    document.getElementById("totalFound").textContent =
        items.filter(item => item.type === "Found").length;
}

displayItems();
updateDashboard();

    }

}


// INITIAL DISPLAY

displayItems();