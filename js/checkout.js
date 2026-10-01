const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");

const grandTotal = document.getElementById("grandTotal");

let total = 0;

cart.forEach(product => {

    const itemTotal = product.price * product.quantity;

    total += itemTotal;

    orderItems.innerHTML += `

    <div class="summary-item">

        <span>${product.name} x ${product.quantity}</span>

        <span>Rs. ${itemTotal}</span>

    </div>

    `;

});

const delivery = 250;

grandTotal.innerText = "Rs. " + (total + delivery);
document.getElementById("placeOrderBtn").addEventListener("click", async function(e){

    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const province = document.getElementById("province").value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;

    const payment = document.querySelector('input[name="payment"]:checked').parentElement.innerText.trim();

    const response = await fetch("/api/orders", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        fullName,
        email,
        phone,
        province,
        city,
        address,
        payment,
        total: total + delivery,
        items: cart

    })

});

// 👇 Ye 2 lines wapas add karo
const data = await response.json();

alert(data.message);

if(data.success){

    localStorage.setItem("orderPhone", phone);

    localStorage.removeItem("cart");

    window.location.href = "my-orders.html";

}

    

});