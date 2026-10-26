import os
import requests
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request
import urllib3
from astronauts import astronauts

load_dotenv()

urllib3.disable_warnings(
    urllib3.exceptions.InsecureRequestWarning
)


app = Flask(__name__)

# Set with: export N2YO_API_KEY="your-new-key"  (Windows: set N2YO_API_KEY=...)
N2YO_API_KEY = os.getenv("N2YO_API_KEY")
ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544"
HEADERS = {"User-Agent": "TrackPoint ISS Tracker"}
_country_cache = {}


def fetch_iss():
    d = requests.get(ISS_URL, timeout=10).json()
    out = {k: round(d[k], 2) for k in ("latitude", "longitude", "altitude", "velocity")}
    out["visibility"] = d["visibility"]
    return out


def get_country(lat, lon, pause=False):
    key = (round(lat), round(lon))  # ~1 degree cells, so Nominatim is rarely hit
    if key in _country_cache:
        return _country_cache[key]
    try:
        r = requests.get(
            "https://nominatim.openstreetmap.org/reverse",
            params={"lat": lat, "lon": lon, "format": "json", "zoom": 3},
            headers=HEADERS, timeout=10,
        )
        country = r.json().get("address", {}).get("country", "Ocean / International Waters")
        _country_cache[key] = country
        if pause:
            time.sleep(1)  # Nominatim limit: 1 request per second
        return country
    except Exception:
        return "Unknown"


@app.route("/")
def home():
    try:
        d = fetch_iss()
    except Exception:
        d = {"latitude": 0, "longitude": 0, "altitude": 0, "velocity": 0, "visibility": "unknown"}
    d["country"] = get_country(d["latitude"], d["longitude"])
    return render_template("home.html", **d)


@app.route("/astronauts")
def astronauts_page():
    return render_template("astronauts.html", astronauts=astronauts)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/iss-data")
def iss_data():
    try:
        d = fetch_iss()
        d["country"] = get_country(d["latitude"], d["longitude"])
        return jsonify(d)
    except Exception as e:
        return jsonify({"error": str(e)}), 502


@app.route("/iss-upcoming")
def iss_upcoming():

    if not N2YO_API_KEY:
        return jsonify({
            "error": "N2YO_API_KEY is missing. Check your .env file."
        }), 500

    url = (
        "https://api.n2yo.com/rest/v1/satellite/"
        "positions/25544/0/0/0/3600"
        f"?apiKey={N2YO_API_KEY}"
    )

    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as e:
        return jsonify({
            "error": f"N2YO request failed: {str(e)}"
        }), 502


if __name__ == "__main__":
    app.run(debug=True)