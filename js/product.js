const params = new URLSearchParams(window.location.search);

const id = params.get("id");
let product;

async function loadProduct() {

    const response = await fetch("/api/products/" + id);

    product = await response.json();

    document.getElementById("productImage").src =
    "/uploads/" + product.image;

    document.getElementById("productName").innerText =
    product.name;

    document.getElementById("productPrice").innerText =
    "Rs. " + product.price;

    document.getElementById("productDescription").innerText =
    product.description;

    document.getElementById("productStock").innerText =
    product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock";

}

loadProduct();
document.getElementById("addToCart").addEventListener("click", function(e){

    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    };

    const existing = cart.find(p => p.id == item.id);

if(existing){

    existing.quantity += 1;

}else{

    cart.push(item);

}

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart Successfully!");

    window.location.href = "cart.html";

});
// ================= REVIEW SYSTEM =================

const reviewForm = document.getElementById("reviewForm");

if(reviewForm){

reviewForm.addEventListener("submit",function(e){

e.preventDefault();

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please Login First");
window.location.href="login.html";
return;
}

const review = {
name:user.name,
rating: document.getElementById("reviewRating").value,
comment:document.getElementById("reviewText").value
};

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviews.push(review);

localStorage.setItem("reviews",JSON.stringify(reviews));

document.getElementById("reviewText").value="";
document.getElementById("reviewRating").value = "5";
// Form Reset
document.getElementById("reviewForm").reset();

document.getElementById("reviewRating").value = "5";

// Stars Reset
selectedRating = 5;

stars.forEach(s => s.classList.add("active"));

// Success Message
alert("✅ Review Submitted Successfully!");


loadReviews();
});

}

function loadReviews(){

const container=document.getElementById("reviewsList");

if(!container) return;

container.innerHTML="";

let reviews=JSON.parse(localStorage.getItem("reviews")) || [];

reviews.reverse().forEach(r=>{

container.innerHTML+=`

<div class="review-card">

<h3>${"⭐".repeat(Number(r.rating))}</h3>

<p>${r.comment}</p>

<strong>${r.name}</strong>

</div>

`;

});

}

loadReviews();
// ================= STAR RATING =================

let selectedRating = 5;

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.classList.add("active");

    star.addEventListener("click", function () {

        selectedRating = this.dataset.value;

        document.getElementById("reviewRating").value = selectedRating;

        stars.forEach(s => s.classList.remove("active"));

        for (let i = 0; i < selectedRating; i++) {
            stars[i].classList.add("active");
        }

    });

});