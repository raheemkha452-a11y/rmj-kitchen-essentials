async function loadProfile(){

    const response = await fetch("/api/profile");

    const profile = await response.json();

    document.getElementById("adminName").value = profile.name;
    document.getElementById("adminEmail").value = profile.email;
    document.getElementById("adminPhone").value = profile.phone;

    if(profile.image){

        document.getElementById("profilePreview").src = profile.image;

    }

}

loadProfile();

document.getElementById("profileForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", document.getElementById("adminName").value);
    formData.append("email", document.getElementById("adminEmail").value);
    formData.append("phone", document.getElementById("adminPhone").value);

    const image = document.getElementById("adminImage").files[0];

    if(image){

        formData.append("image", image);

    }

    const response = await fetch("/api/profile",{

        method:"PUT",

        body:formData

    });

    const data = await response.json();

    alert(data.message);

    loadProfile();

});