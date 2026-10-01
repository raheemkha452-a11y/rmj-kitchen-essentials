document.getElementById("passwordForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(newPassword !== confirmPassword){

        alert("New Password and Confirm Password do not match.");

        return;

    }

    const response = await fetch("/api/change-password",{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            currentPassword,
            newPassword

        })

    });

    const data = await response.json();

    alert(data.message);

    if(data.success){

        document.getElementById("passwordForm").reset();

    }

});