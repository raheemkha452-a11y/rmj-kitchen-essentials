async function loadOrders() {

    const response = await fetch("/api/orders");

    const orders = await response.json();

    const table = document.getElementById("orderTable");

    table.innerHTML = "";
    // ================= ORDER STATISTICS =================

document.getElementById("totalOrders").innerText = orders.length;

document.getElementById("pendingOrders").innerText =
orders.filter(order => order.status === "Pending").length;

document.getElementById("deliveredOrders").innerText =
orders.filter(order => order.status === "Delivered").length;

let revenue = 0;

orders.forEach(order => {

    revenue += Number(order.total);

});

document.getElementById("totalRevenue").innerText =
"Rs. " + revenue.toLocaleString();
    const search = document.getElementById("searchOrder").value.toLowerCase();

const filteredOrders = orders.filter(order => {

    return (
        order.fullName.toLowerCase().includes(search) ||
        order.phone.toLowerCase().includes(search) ||
        order.city.toLowerCase().includes(search)
    );

});

    filteredOrders.forEach(order => {

        table.innerHTML += `

<tr>

    <td>${order.id}</td>

    <td>${order.fullName}</td>

    <td>${order.phone}</td>

    <td>${order.city}</td>

    <td>${order.payment}</td>

    <td>${new Date(order.createdAt).toLocaleDateString()}</td>

    <td>Rs. ${order.total}</td>

    <td>

        <select class="status-select" id="status-${order.id}">

            <option value="Pending" ${order.status=="Pending"?"selected":""}>Pending</option>

            <option value="Confirmed" ${order.status=="Confirmed"?"selected":""}>Confirmed</option>

            <option value="Processing" ${order.status=="Processing"?"selected":""}>Processing</option>

            <option value="Shipped" ${order.status=="Shipped"?"selected":""}>Shipped</option>

            <option value="Delivered" ${order.status=="Delivered"?"selected":""}>Delivered</option>

            <option value="Cancelled" ${order.status=="Cancelled"?"selected":""}>Cancelled</option>

        </select>

    </td>

   <td>

<button
class="view-order-btn"
onclick="viewOrder(${order.id})">

<i class="fa-solid fa-eye"></i>

View

</button>

<button
class="save-order-btn"
onclick="updateStatus(${order.id})">

<i class="fa-solid fa-floppy-disk"></i>

Save

</button>
<button
class="delete-order-btn"
onclick="deleteOrder(${order.id})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</td>

</tr>

`;

    });

}

loadOrders();
 document.getElementById("searchOrder").addEventListener("keyup", () => {

    loadOrders();

});

async function updateStatus(id){

    const status = document.getElementById(`status-${id}`).value;

    const response = await fetch("/api/orders/" + id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:status
        })

    });

    const data = await response.json();

    alert(data.message);

    loadOrders();

}
// ================= VIEW ORDER =================

async function viewOrder(id){

    const response = await fetch("/api/orders/" + id);

    const order = await response.json();
    let productsHTML = "";

order.items.forEach(item => {

    productsHTML += `

    <div class="ordered-product">

        <h4>${item.name}</h4>

        <p>Price : Rs. ${item.price}</p>

        <p>Quantity : ${item.quantity}</p>

        <hr>

    </div>

    `;

});

    document.getElementById("orderDetails").innerHTML = `

        <p><b>Order ID:</b> ${order.id}</p>

        <p><b>Customer:</b> ${order.fullName}</p>

        <p><b>Email:</b> ${order.email}</p>

        <p><b>Phone:</b> ${order.phone}</p>

        <p><b>Province:</b> ${order.province}</p>

        <p><b>City:</b> ${order.city}</p>

        <p><b>Address:</b> ${order.address}</p>

        <p><b>Payment:</b> ${order.payment}</p>
        <h3>Ordered Products</h3>

${productsHTML}

        <p><b>Total:</b> Rs. ${order.total}</p>

        <p><b>Status:</b> ${order.status}</p>

        <p><b>Order Date:</b> ${new Date(order.createdAt).toLocaleString()}</p>

    `;

    document.getElementById("orderModal").style.display = "block";

}

// ================= CLOSE MODAL =================

function closeOrderModal(){

    document.getElementById("orderModal").style.display = "none";

}

window.onclick = function(e){

    const modal = document.getElementById("orderModal");

    if(e.target == modal){

        modal.style.display = "none";

    }

}
// ================= DELETE ORDER =================

async function deleteOrder(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this order?"
    );

    if(!confirmDelete){
        return;
    }

    const response = await fetch("/api/orders/" + id,{

        method:"DELETE"

    });

    const data = await response.json();

    alert(data.message);

    loadOrders();

}
// ================= PRINT INVOICE =================

function printInvoice(){

    const invoice = document.getElementById("orderDetails").innerHTML;

    const newWindow = window.open("", "", "width=900,height=700");

    newWindow.document.write(`

    <html>

    <head>

    <title>RMJ Invoice</title>

    <style>

    body{

        font-family:Arial,sans-serif;

        padding:40px;

    }

    h1{

        text-align:center;

        color:#ff6b35;

    }

    h3{

        margin-top:30px;

    }

    p{

        line-height:1.8;

        font-size:16px;

    }

    hr{

        margin:20px 0;

    }

    .footer{

        text-align:center;

        margin-top:40px;

        color:#777;

    }

    </style>

    </head>

    <body>

        <h1>RMJ Kitchen Essentials</h1>

        <hr>

        ${invoice}

        <hr>

        <div class="footer">

            <h3>Thank You For Shopping With RMJ</h3>

        </div>

    </body>

    </html>

    `);

    newWindow.document.close();

    newWindow.print();

}