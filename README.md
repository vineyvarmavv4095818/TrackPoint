# 🛰️ TrackPoint — ISS Real-Time Tracker

TrackPoint is a real-time web application that allows users to monitor the current location and movement of the International Space Station (ISS).

The application fetches live ISS telemetry data and visualizes its position on an interactive world map. It also provides useful information such as latitude, longitude, altitude, velocity, visibility, and the country currently below the ISS.

---

## 🚀 Features

- 🌍 Real-time ISS location tracking
- 🗺️ Interactive world map using Leaflet.js
- 🛰️ Live ISS position marker
- 🛤️ ISS orbit trail showing its recent movement
- 📍 Current latitude and longitude
- ⛰️ Current altitude
- 🚀 Current velocity
- 👁️ ISS visibility status
- 🌎 Current country/location detection
- 👨‍🚀 List of astronauts currently in space
- 📊 Real-time data updates
- 📱 Clean and responsive dashboard design

---

## 🖥️ Dashboard

The main dashboard displays real-time ISS information along with an interactive map.

The interface includes:

- ISS location
- Altitude
- Velocity
- Visibility
- Current country
- Live map with ISS marker
- ISS movement trail

---

## 👨‍🚀 Astronauts

TrackPoint also provides a dedicated astronauts section where users can view information about astronauts currently in space.

Each astronaut card contains:

- Name
- Agency
- Profile image

---

## ℹ️ About Section

The application includes an About page describing:

- Project overview
- Features
- Technologies used
- APIs used
- Future improvements

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Leaflet.js
- Font Awesome

### Backend
- Python
- Flask

### APIs
- Where The ISS At API
- OpenStreetMap Nominatim API

### Development Tools
- Git
- GitHub
- Virtual Environment (venv)

---

## 📂 Project Structure

```text
ISS-Tracker/
│
├── app.py
├── astronauts.py
├── requirements.txt
├── .gitignore
│
├── templates/
│   ├── base.html
│   ├── home.html
│   ├── astronauts.html
│   └── about.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    ├── JS/
    │   └── script.js
    │
    └── images/
