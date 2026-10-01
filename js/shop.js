let allProducts = [];

async function loadProducts() {

    const response = await fetch("/api/products");

    allProducts = await response.json();

    displayProducts(allProducts);

}

function displayProducts(products) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;width:100%;color:#777;margin-top:40px;">
                No Products Found
            </h2>
        `;

        return;

    }

    products.forEach(product => {

       container.innerHTML += `

<div class="card">

    <div class="card-image">

        <img src="/uploads/${product.image}" alt="${product.name}">

    </div>

    <div class="card-content">

        <h3>${product.name}</h3>

        <p class="price">Rs. ${product.price}</p>

        <a href="/product.html?id=${product.id}" class="view-btn">

            View Product

        </a>

    </div>

</div>

`;
    });

}

// ================= SEARCH =================

document.getElementById("searchInput").addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filtered = allProducts.filter(product =>

        product.name.toLowerCase().includes(value) ||

        (product.category && product.category.toLowerCase().includes(value))

    );

    displayProducts(filtered);

});

// ================= START =================

loadProducts();