const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const map = L.map('map', { worldCopyJump: true }).setView([latitude, longitude], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=cb1_4uyo_1_ed8601a241d1153e6fb5dcd6', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 12
}).addTo(map);
setTimeout(() => map.invalidateSize(), 100);

const issIcon = L.icon({
    iconUrl: issIconUrl, iconSize: [50, 50], iconAnchor: [25, 25],
    popupAnchor: [0, -25], className: 'iss-icon'
});
const marker = L.marker([latitude, longitude], { icon: issIcon }).addTo(map).bindPopup("🛰 ISS (ZARYA)");
const trail = L.polyline([], { color: '#ffb347', weight: 3, opacity: 0.85 }).addTo(map);
const future = L.polyline([], { color: '#7fd4ff', weight: 2, opacity: 0.7, dashArray: '6 8' }).addTo(map);

// Lines are lists of segments so they never jump across the 180° meridian
let segments = [[[latitude, longitude]]];
function addPoint(segs, p) {
    const seg = segs[segs.length - 1], last = seg[seg.length - 1];
    if (last && Math.abs(p[1] - last[1]) > 180) segs.push([p]); else seg.push(p);
}

function setConn(ok) {
    const c = $("conn");
    c.className = "conn " + (ok ? "ok" : "bad");
    c.textContent = ok ? "Connected" : "Connection lost, retrying";
}

async function updateISS() {
    try {
        const res = await fetch("/iss-data");
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || res.status);

        $("latitude").textContent = data.latitude;
        $("longitude").textContent = data.longitude;
        $("altitude").textContent = `${data.altitude} km`;
        $("velocity").textContent = `${data.velocity} km/h`;
        $("visibility").textContent = data.visibility;
        if (data.country) $("country").textContent = data.country;

        const pos = [data.latitude, data.longitude];
        marker.setLatLng(pos);
        marker.setPopupContent(`<b>🛰 ISS (ZARYA)</b><br><br>Latitude : ${data.latitude}<br>Longitude : ${data.longitude}<br>Altitude : ${data.altitude} km<br>Velocity : ${data.velocity} km/h<br>Visibility : ${esc(data.visibility)}`);

        addPoint(segments, pos);
        if (segments.reduce((n, s) => n + s.length, 0) > 100) {
            segments[0].shift();
            if (!segments[0].length && segments.length > 1) segments.shift();
        }
        trail.setLatLngs(segments);

        $("iss-status").innerHTML = data.visibility === "daylight"
            ? '<i class="fa-solid fa-sun sun"></i> Daylight'
            : '<i class="fa-solid fa-moon moon"></i> Night';
        setConn(true);
    } catch (err) {
        console.error("ISS update failed:", err);
        setConn(false);
    }
}


async function loadUpcomingISS() {
    const box = $("passes-container");

    try {
        const res = await fetch("/iss-upcoming");
        const data = await res.json();

        if (!res.ok || data.error) {
            throw new Error(data.error || `HTTP ${res.status}`);
        }

        if (!Array.isArray(data.positions) || data.positions.length === 0) {
            throw new Error("API response does not contain a valid positions array.");
        }

        // Support both processed Flask data and raw N2YO API data
        const positions = data.positions.map(p => ({
            latitude: p.latitude ?? p.satlatitude,
            longitude: p.longitude ?? p.satlongitude,
            timestamp: Number(p.timestamp),
            location: p.location || "Location unavailable"
        }));

        const segs = [[]];

        positions.forEach(p => {
            if (
                Number.isFinite(Number(p.latitude)) &&
                Number.isFinite(Number(p.longitude))
            ) {
                addPoint(segs, [Number(p.latitude), Number(p.longitude)]);
            }
        });

        future.setLatLngs(segs);

        box.innerHTML = positions.map(p => {
            const mins = Math.round(
                (p.timestamp * 1000 - Date.now()) / 60000
            );

            const when = mins <= 0 ? "Now" : `In ${mins} min`;

            const t = Number.isFinite(p.timestamp)
                ? new Date(p.timestamp * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "Time unavailable";

            return `
                <div class="pass">
                    <strong>${when}</strong>
                    <span class="t">${t}</span>
                    <p>${esc(p.location)}</p>
                    <small>${p.latitude}°, ${p.longitude}°</small>
                </div>
            `;
        }).join("");

    } catch (err) {
        console.error("Upcoming positions failed:", err);

        box.innerHTML = `
            <p class="muted">
                Upcoming orbit error: ${esc(err.message)}
            </p>
        `;
    }
}


updateISS();
setInterval(updateISS, 5000);
loadUpcomingISS();
setInterval(loadUpcomingISS, 5 * 60 * 1000);