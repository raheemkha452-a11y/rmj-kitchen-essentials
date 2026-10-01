const user = JSON.parse(localStorage.getItem("user"));

if(user){

    const loginMenu = document.getElementById("loginMenu");
    const profileMenu = document.getElementById("profileMenu");

    if(loginMenu) loginMenu.style.display="none";

    if(profileMenu){

        profileMenu.style.display = "block";

        profileMenu.innerHTML=`

<div class="profile-menu">

<div class="profile-circle" id="profileCircle">
${user.name.charAt(0).toUpperCase()}
</div>

<div class="profile-dropdown" id="profileDropdown">

<p><strong>${user.name}</strong></p>
<p>${user.email}</p>

<hr>

<a href="my-orders.html">My Orders</a>
<a href="#" id="logoutBtn">Logout</a>

</div>

</div>

`;

        document.getElementById("profileCircle").onclick=function(){

            document.getElementById("profileDropdown").classList.toggle("show");

        };

        document.getElementById("logoutBtn").onclick=function(e){

            e.preventDefault();

            localStorage.removeItem("user");

            window.location.href="login.html";

        };

    }

}
