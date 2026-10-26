# 🛰️ TrackPoint: ISS Real-Time Tracker

**TrackPoint** is a Flask web app that shows where the International Space Station is right now. It follows the station over an interactive dark world map, reports live telemetry, names the country below it, and lists the astronauts currently in space.

The ISS travels at about 27,600 km/h and circles the Earth roughly every 92 minutes. TrackPoint updates its position every 5 seconds.

---

## ✨ Features

- 🌍 **Live ISS tracking** on an interactive Leaflet map with a glowing station marker
- 🛤️ **Orbit trail** showing the station's recent path, drawn correctly across the 180° meridian
- 🔮 **Upcoming orbit path** drawn as a dashed line, with a card for each predicted position
- 📍 **Live telemetry:** latitude, longitude, altitude, velocity and visibility (daylight or night)
- 🏳️ **Country detection:** shows the country the ISS is flying over, or "Ocean / International Waters"
- 👨‍🚀 **Astronauts page** with agency badges, agency filters and initials avatars for missing photos
- 🕒 **UTC clock** and a daylight/night indicator in the navbar
- 📡 **Connection status badge** that shows when an API request fails and keeps retrying
- 📱 **Responsive layout** that works on desktop, tablet and phone

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, Flask, Requests |
| Frontend | HTML5, CSS3, JavaScript, Jinja2 templates |
| Map | Leaflet.js with dark map tiles |
| Icons and fonts | Font Awesome, Chakra Petch, IBM Plex Sans |

### 🔌 APIs Used

| API | Purpose | Key needed |
|-----|---------|------------|
| Where The ISS At | Live position, altitude, velocity, visibility | No |
| OpenStreetMap Nominatim | Reverse geocoding (country below the ISS) | No |
| N2YO | Upcoming ISS positions | Yes (free) |

---

## 📂 Project Structure

```text
ISS-Tracker/
│
├── app.py                  # Flask app and API routes
├── astronauts.py           # Astronaut data (name, agency, image)
├── requirements.txt
├── .gitignore
│
├── templates/
│   ├── base.html           # Shared layout (navbar, footer)
│   ├── home.html           # Map, telemetry, upcoming positions
│   ├── astronauts.html     # Astronaut cards and filters
│   └── about.html          # About page
│
└── static/
    ├── css/
    │   └── style.css       # Theme and layout
    ├── JS/
    │   ├── script.js       # Map, live updates, trail, upcoming path
    │   └── clock.js        # UTC clock
    └── images/             # ISS marker and astronaut photos
```

---

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard with live map and telemetry |
| `/astronauts` | Astronauts currently in space |
| `/about` | About the project |
| `/iss-data` | JSON: live position, telemetry and country |
| `/iss-upcoming` | JSON: predicted upcoming ISS positions with locations |

---

## 🚀 Getting Started

### 1. Prerequisites

- Python 3.9 or newer
- pip
- A free N2YO API key (needed only for the upcoming-positions section)

### 2. Download the project

Download or clone the repository, then open a terminal in the project folder.

### 3. Create a virtual environment (recommended)

```bash
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

If you don't have a `requirements.txt` yet, create one containing:

```text
Flask
requests
```

### 5. Get an N2YO API key

1. Register a free account on the N2YO website.
2. Log in and open your profile page.
3. Scroll to the bottom and click the button that generates an API key.
4. Copy the key. It can't be changed later, so keep it private.

### 6. Set the API key

The key is read from an environment variable named `N2YO_API_KEY`, so it never goes in your code.

```bash
# Windows PowerShell
$env:N2YO_API_KEY="your-key-here"

# Windows Command Prompt
set N2YO_API_KEY=your-key-here

# macOS / Linux
export N2YO_API_KEY="your-key-here"
```

The variable only lasts for the current terminal window, so set it again in each new one.

### 7. Run the app

```bash
python app.py
```

Open `127.0.0.1:5000` in your browser.

---

## 🔐 Security Notes

- Never commit your API key to GitHub.
- Add `venv/` and any `.env` files to `.gitignore`.
- If a key is ever pasted into public code, contact N2YO and ask for a replacement.

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| Upcoming positions show an error | Check that `N2YO_API_KEY` is set in the same terminal that runs Flask |
| Map tiles show an "API KEY REQUIRED" watermark | The tile provider now requires a key. Switch to a keyless tile source or add a free tile key in `script.js`, then hard refresh with Ctrl+F5 |
| Images don't load on Linux hosting | Folder names are case-sensitive. Use `static/images/` and `static/JS/` exactly |
| "Connection lost" badge appears | An API is slow or down. The app retries automatically |
| Country shows "Unknown" | Nominatim limits requests. Wait a moment and it will recover |

---

## 👨‍🚀 Updating the Astronaut List

Crews rotate every few months. Edit `astronauts.py` and add each person's name, agency and image filename, then put the photo in `static/images/`:

```python
{"name": "Full Name", "agency": "NASA", "image": "pic1.jpg"}
```

If a photo is missing, the card shows the person's initials instead.

---

## 🔮 Future Improvements

- Automatically fetch the current crew instead of using a fixed list
- Show visible-pass predictions for the user's own location
- Add a day/night shadow overlay on the map
- Add a light theme and a theme toggle
- Save a history of the ISS path
- Deploy to a cloud host

---

## 🙏 Acknowledgements

- Where The ISS At for live telemetry data
- N2YO for satellite position predictions
- OpenStreetMap and Nominatim for geocoding
- Leaflet.js for the interactive map
- The astronauts and ground crews who keep the ISS running

---

## 👤 Author

**VINAY VERMA**

---

⭐ If you like this project, give it a star.
