const phone = localStorage.getItem("orderPhone");

if(!phone){

    document.getElementById("ordersContainer").innerHTML = `
        <h2>No Orders Found</h2>
        <p>Please place an order first.</p>
    `;

}else{

    loadOrders();

}

async function loadOrders(){

    const response = await fetch("/api/my-orders/" + phone);

    const orders = await response.json();

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";

    if(orders.length==0){

        container.innerHTML = `
            <h2>No Orders Found</h2>
        `;

        return;

    }

    orders.forEach(order=>{

        container.innerHTML += `

<div class="my-order-card">

<h2>Order #${order.id}</h2>

<p>
<b>Status:</b>
<span class="status ${order.status.toLowerCase()}">
${order.status}
</span>
</p>

<p><b>Date:</b> ${new Date(order.createdAt).toLocaleDateString("en-GB")}</p>

<p><b>Total:</b> Rs. ${order.total}</p>

<div class="order-buttons">

<button
class="order-view-btn"
onclick="viewItems(${order.id})">

View Products

</button>

<button
class="delete-btn"
onclick="deleteOrder(${order.id})">

Delete Order

</button>

</div>

</div>

`;

    });

}
// ================= DELETE ORDER =================

async function deleteOrder(id){

    if(!confirm("Are you sure you want to delete this order?")) return;

    const response = await fetch("/api/orders/" + id,{

        method:"DELETE"

    });

    const data = await response.json();

    alert(data.message);

    loadOrders();

}

// ================= VIEW PRODUCTS =================

// ================= VIEW PRODUCTS =================

async function viewItems(id){

    const response = await fetch("/api/orders/" + id);

    const order = await response.json();

    let html = "";

    order.items.forEach(item=>{

        html += `

<div class="product-item">

<div>

<h3>${item.name}</h3>

<p>Quantity : ${item.quantity}</p>

</div>

<div>

<b>Rs. ${item.price}</b>

</div>

</div>

`;

    });

    document.getElementById("productsList").innerHTML = html;

    document.getElementById("productsModal").style.display = "block";

}

// ================= CLOSE PRODUCTS =================

function closeProducts(){

    document.getElementById("productsModal").style.display = "none";

}

window.onclick = function(e){

    const modal = document.getElementById("productsModal");

    if(e.target == modal){

        modal.style.display = "none";

    }

}