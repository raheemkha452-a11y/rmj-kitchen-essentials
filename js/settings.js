// ================= LOAD SETTINGS =================

async function loadSettings() {

    const response = await fetch("/api/settings");

    const data = await response.json();

    document.getElementById("siteName").value = data.site_name || "";
    document.getElementById("siteEmail").value = data.site_email || "";
    document.getElementById("sitePhone").value = data.site_phone || "";
    document.getElementById("siteAddress").value = data.site_address || "";
    document.getElementById("workingHours").value = data.working_hours || "";

}

loadSettings();


// ================= SAVE SETTINGS =================

document.getElementById("settingsForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const response = await fetch("/api/settings",{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            site_name:document.getElementById("siteName").value,
            site_email:document.getElementById("siteEmail").value,
            site_phone:document.getElementById("sitePhone").value,
            site_address:document.getElementById("siteAddress").value,
            working_hours:document.getElementById("workingHours").value,

            facebook:"",
            instagram:"",
            youtube:"",
            tiktok:""

        })

    });

    const data = await response.json();

    alert(data.message);

});