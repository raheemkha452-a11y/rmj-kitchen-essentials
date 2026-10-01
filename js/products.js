alert("Products JS Connected");
alert("Table = " + document.getElementById("productTable"));
const productForm = document.getElementById("productForm");

// ================= ADD PRODUCT =================

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", document.getElementById("productName").value);
    formData.append("price", document.getElementById("productPrice").value);
    formData.append("category", document.getElementById("productCategory").value);
    formData.append("stock", document.getElementById("productStock").value);
    formData.append("description", document.getElementById("productDescription").value);

    const image = document.getElementById("productImage").files[0];

    if (image) {
        formData.append("image", image);
    }

let response;

const productId = productForm.getAttribute("data-id");

if (productId) {

    response = await fetch("/api/products/" + productId, {
        method: "PUT",
        body: formData
    });

} else {

    response = await fetch("/api/products", {
        method: "POST",
        body: formData
    });

}

const data = await response.json();

alert(data.message);

if (data.success) {

    productForm.reset();

    productForm.removeAttribute("data-id");

    document.getElementById("addProductBtn").innerHTML =
    '<i class="fa-solid fa-plus"></i> Add Product';

    loadProducts();

}
});

// ================= LOAD PRODUCTS =================

async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();

    const table = document.getElementById("productTable");

    table.innerHTML = "";


    products.forEach(product => {

        table.innerHTML += `

        <tr>

            <td>${product.id}</td>

            <td>
                <img src="/uploads/${product.image}"
                     width="70"
                     height="70"
                     style="border-radius:8px; object-fit:cover;">
            </td>

            <td>${product.name}</td>

            <td>Rs. ${product.price}</td>

            <td>${product.category}</td>

            <td>${product.stock}</td>

          <td>

    <button
        class="edit-btn"
        onclick="editProduct(${product.id})">
        Edit
    </button>

    <button
        class="delete-btn"
        onclick="deleteProduct(${product.id})">
        Delete
    </button>

</td>

        </tr>

        `;

    });

}

// ================= DELETE PRODUCT =================

async function deleteProduct(id) {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    const response = await fetch("/api/products/" + id, {
        method: "DELETE"
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
        loadProducts();
    }

}
// ================= EDIT PRODUCT =================

async function editProduct(id) {

    const response = await fetch("/api/products/" + id);

    const product = await response.json();

    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productDescription").value = product.description;

    // Product ID ko form mein temporarily save karenge
    productForm.setAttribute("data-id", product.id);

    // Button ka text change
    document.getElementById("addProductBtn").innerHTML =
    '<i class="fa-solid fa-pen"></i> Update Product';

}

// ================= START =================

loadProducts();