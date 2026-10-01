async function loadUsers() {

    const response = await fetch("/api/users");

    const users = await response.json();

    const table = document.getElementById("usersTable");

    table.innerHTML = "";

    let adminCount = 0;

    users.forEach(user => {

        if(user.role === "admin"){
            adminCount++;
        }

        table.innerHTML += `

        <tr>

            <td>${user.id}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>

                <span class="${
                    user.role === "admin"
                    ? "role-admin"
                    : "role-user"
                }">

                    ${user.role}

                </span>

            </td>

            <td>

                <button class="view-btn">
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteUser(${user.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalAdmins").innerText = adminCount;
    document.getElementById("activeUsers").innerText = users.length;
    document.getElementById("newUsers").innerText = users.length;

}

loadUsers();