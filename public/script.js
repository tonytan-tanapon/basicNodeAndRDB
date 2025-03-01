document.addEventListener("DOMContentLoaded", fetchData);

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content').forEach(div => div.classList.remove('active'));

    document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(tab).classList.add('active');
}

function fetchData() {
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            const tableHeader = document.getElementById('table-header');
            const tableBody = document.getElementById('table-body');

            tableHeader.innerHTML = "";
            tableBody.innerHTML = "";

            if (!data.length) {
                tableBody.innerHTML = "<tr><td colspan='100%'>No data available</td></tr>";
                return;
            }

            tableHeader.innerHTML = "<th>ID</th><th>Name</th><th>Description</th><th>Actions</th>";

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>
                        <span id="name-text-${row.id}">${row.name}</span>
                        <input type="text" class="edit-input" value="${row.name}" id="name-input-${row.id}">
                    </td>
                    <td>
                        <span id="desc-text-${row.id}">${row.description}</span>
                        <input type="text" class="edit-input" value="${row.description}" id="desc-input-${row.id}">
                    </td>
                    <td>
                        <button onclick="toggleEdit(${row.id})" id="edit-btn-${row.id}">Modify</button>
                        <button onclick="deleteData(${row.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            filterData(); // Apply filter after fetching data
        })
        .catch(error => alert("Failed to load data"));
}

function addData() {
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();

    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    }).then(() => {
        fetchData();
        switchTab('view');
    });
}

function toggleEdit(id) {
    const nameText = document.getElementById(`name-text-${id}`);
    const descText = document.getElementById(`desc-text-${id}`);
    const nameInput = document.getElementById(`name-input-${id}`);
    const descInput = document.getElementById(`desc-input-${id}`);
    const editBtn = document.getElementById(`edit-btn-${id}`);

    if (editBtn.textContent === "Modify") {
        // Enter edit mode
        nameText.style.display = "none";
        descText.style.display = "none";
        nameInput.style.display = "inline-block";
        descInput.style.display = "inline-block";
        editBtn.textContent = "Save";
    } else {
        // Save changes
        saveEdit(id, nameInput.value, descInput.value);
    }
}

function saveEdit(id, newName, newDescription) {
    fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, description: newDescription })
    }).then(() => {
        fetchData();
    });
}

function deleteData(id) {
    fetch(`http://localhost:3000/delete/${id}`, { method: 'DELETE' })
        .then(fetchData);
}

function filterData() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#table-body tr');

    rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2) span'); // Select visible name span
        if (nameCell) {
            const nameText = nameCell.textContent.toLowerCase();
            row.style.display = nameText.includes(searchQuery) ? "" : "none";
        }
    });
}
