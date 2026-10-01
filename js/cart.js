const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const subtotal = document.getElementById("subtotal");
const grandTotal = document.getElementById("grandTotal");

let total = 0;

if (cart.length === 0) {

    document.querySelector(".cart-table").style.display = "none";
    emptyCart.style.display = "block";

} else {

    emptyCart.style.display = "none";

    cart.forEach((product, index) => {

        const itemTotal = product.price * product.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

        <tr>

            <td>

                <div class="cart-product">

                    <img src="/uploads/${product.image}" width="80" onerror="this.src='images/no-image.png'">

                    <div>

                        <h3>${product.name}</h3>

                    </div>

                </div>

            </td>
            <td class="cart-price">Rs. ${product.price}</td>

<td class="cart-quantity">${product.quantity}</td>

<td class="cart-total">Rs. ${itemTotal}</td>

<td class="cart-remove">


                <button onclick="removeItem(${index})" class="remove-btn">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

if (subtotal) {

    subtotal.innerText = "Rs. " + total;

}

if (grandTotal) {

    grandTotal.innerText = "Rs. " + (total + 250);

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}