async function loadDashboard() {

    // Products
    const productRes = await fetch("/api/products");
    const products = await productRes.json();

    document.getElementById("totalProducts").innerText = products.length;

}

loadDashboard();