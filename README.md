<div align="center">

# 🛰️ TrackPoint

### Real-time International Space Station tracker

Watch the ISS move across the world map, see where it is right now, and meet the astronauts on board.

![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?logo=flask&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet.js-Map-199900?logo=leaflet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Live%20Data-brightgreen)

</div>

---

## 📸 Preview

> Add your screenshots to a `screenshots/` folder and update the paths below.

| Dashboard | Astronauts |
|-----------|------------|
| ![Dashboard](screenshots/dashboard.png) | ![Astronauts](screenshots/astronauts.png) |

---

## ✨ Features

- 🌍 **Live ISS position** on an interactive dark world map, refreshed every 5 seconds
- 🛤️ **Orbit trail** showing the ISS's recent movement, with correct handling of the 180° longitude line
- 🔮 **Upcoming path** drawn as a dashed line, with a card for each predicted position and the country it will pass over
- 📍 **Live telemetry:** latitude, longitude, altitude and velocity
- 👁️ **Visibility status** (daylight or night) and a matching sun or moon indicator
- 🌎 **Country detection:** shows which country or ocean the ISS is flying over
- 👨‍🚀 **Astronauts page** with name, agency badge and photo, plus filtering by agency
- 🕒 **UTC clock** with date and day in the navbar
- 📡 **Connection indicator** that shows when an API request fails and retries automatically
- 📱 **Responsive design** that works on desktop, tablet and phone
- 🎨 **Mission-control dark theme** built with custom CSS

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | HTML5, CSS3, JavaScript, Leaflet.js, Font Awesome |
| Backend | Python, Flask, Jinja2 |
| APIs | Where The ISS At, OpenStreetMap Nominatim, N2YO |
| Tools | Git, GitHub, Virtual Environment (venv) |

---

## 🔌 APIs Used

| API | Used for | API key |
|-----|----------|---------|
| [Where The ISS At](https://wheretheiss.at/w/developer) | Live position, altitude, velocity, visibility | Not required |
| [OpenStreetMap Nominatim](https://nominatim.org/) | Reverse geocoding to find the country | Not required |
| [N2YO](https://www.n2yo.com/api/) | Upcoming ISS positions | **Required (free)** |

---

## 📂 Project Structure

```text
ISS-Tracker/
│
├── app.py                 # Flask app and API routes
├── astronauts.py          # Astronaut data
├── requirements.txt
├── .gitignore
│
├── templates/
│   ├── base.html          # Shared layout (navbar, footer)
│   ├── home.html          # Map and live dashboard
│   ├── astronauts.html    # Astronaut cards
│   └── about.html
│
└── static/
    ├── css/
    │   └── style.css
    ├── JS/
    │   ├── script.js      # Map, live updates, upcoming path
    │   └── clock.js       # UTC clock
    └── images/            # ISS marker and astronaut photos
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ISS-Tracker.git
cd ISS-Tracker
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Get a free N2YO API key

1. Register at [n2yo.com](https://www.n2yo.com/login/)
2. Log in and open your [profile page](https://www.n2yo.com/login/edit/)
3. Scroll down and generate your API key

### 5. Set the API key

The key is read from an environment variable, so it never goes into the code.

```bash
# Windows (PowerShell)
$env:N2YO_API_KEY="your-key-here"

# Windows (Command Prompt)
set N2YO_API_KEY=your-key-here

# macOS / Linux
export N2YO_API_KEY="your-key-here"
```

### 6. Run the app

```bash
python app.py
```

Open **http://127.0.0.1:5000** in your browser.

> The live map, stats and astronauts page work without the N2YO key. Only the upcoming path section needs it.

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard with the live map and ISS telemetry |
| `/astronauts` | Astronauts currently in space |
| `/about` | About the project |
| `/iss-data` | JSON: live position, altitude, velocity, visibility and country |
| `/iss-upcoming` | JSON: upcoming ISS positions with locations |

---

## 👨‍🚀 Updating the Astronauts

Astronauts are stored in `astronauts.py`. To update the crew, edit the list and add each photo to `static/images/`:

```python
{
    "name": "Astronaut Name",
    "agency": "NASA",
    "image": "pic1.jpg"
}
```

---

## 🔒 Security Notes

- Never commit your API key. Use the `N2YO_API_KEY` environment variable.
- Keep `venv/` and any `.env` file in `.gitignore`.
- Nominatim allows about one request per second. TrackPoint caches country lookups to stay within that limit.

---

## 🔮 Future Improvements

- Fetch the astronaut list automatically from a live API
- Visible pass predictions for the user's own location
- Light and dark theme toggle
- Historical orbit playback
- Deployment on Render or PythonAnywhere

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Fork the repository, create a branch, and open a pull request.

---

## 🙏 Acknowledgements

- [Where The ISS At](https://wheretheiss.at/) for live ISS telemetry
- [N2YO](https://www.n2yo.com/) for satellite position data
- [OpenStreetMap](https://www.openstreetmap.org/) and Nominatim for map data and reverse geocoding
- [Leaflet](https://leafletjs.com/) for the interactive map
- [Font Awesome](https://fontawesome.com/) for icons

---

<div align="center">

Made with ❤️ by [YOUR-NAME](https://github.com/YOUR-USERNAME)

⭐ If you like this project, give it a star!

</div>
