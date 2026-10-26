function updateClock() {
    const now = new Date();
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    const time = now.toLocaleTimeString("en-GB", { timeZone: "UTC", hour12: false });
    const date = now.toLocaleDateString("en-GB", { timeZone: "UTC" });
    const day = now.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    set("utc-time", `<i class="fa-solid fa-clock"></i> UTC ${time}`);
    set("utc-date", `<i class="fa-solid fa-calendar-days"></i> ${date}`);
    set("utc-day", `<i class="fa-solid fa-calendar-week"></i> ${day}`);
}
updateClock();
setInterval(updateClock, 1000);