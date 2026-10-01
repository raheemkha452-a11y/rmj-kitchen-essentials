async function loadContactInfo() {

    try {

        const response = await fetch("/api/settings");

        const data = await response.json();

        document.getElementById("contactAddress").innerText =
        data.site_address;

        document.getElementById("contactPhone").innerText =
        data.site_phone;

        document.getElementById("contactEmail").innerText =
        data.site_email;

        document.getElementById("workingHoursText").innerText =
        data.working_hours;

    } catch (error) {

        console.log(error);

    }

}

loadContactInfo();