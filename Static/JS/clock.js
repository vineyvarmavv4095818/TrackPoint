function updateClock(){

    const now = new Date();


    const time = now.toLocaleTimeString("en-GB",{
        timeZone:"UTC",
        hour12:false
    });


    const date = now.toLocaleDateString("en-GB",{
        timeZone:"UTC"
    });


    const day = now.toLocaleDateString("en-US",{
        weekday:"long",
        timeZone:"UTC"
    });


    document.getElementById("utc-time").innerHTML =
    `<i class="fa-solid fa-clock" style="color:blue"></i> UTC : ${time}`;


    document.getElementById("utc-date").innerHTML =
    `<i class="fa-solid fa-calendar-days"></i> ${date}`;


    document.getElementById("utc-day").innerHTML =
    `<i class="fa-solid fa-calendar-week"></i> ${day}`;

}


updateClock();

setInterval(updateClock,1000);