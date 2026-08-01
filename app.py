import requests
from flask import Flask, render_template, jsonify
import urllib3
from astronauts import astronauts

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)


@app.route("/")
def home():

    url = "https://api.wheretheiss.at/v1/satellites/25544"
    response = requests.get(url)
    # response = requests.get(url, verify=False, timeout=10)
    data = response.json()
    latitude = round(data['latitude'],2)
    longitude = round(data['longitude'],2)
    altitude = round(data['altitude'],2)
    velocity = round(data['velocity'],2)
    visibility = data['visibility']

    reverse_url = (
        f"https://nominatim.openstreetmap.org/reverse"
        f"?lat={latitude}&lon={longitude}&format=json"
    )

    headers = {
        "User-Agent": "ISS Tracker"
    }

    location_response = requests.get(reverse_url, headers=headers)

    location_data = location_response.json()

    address = location_data.get("address", {})

    country = address.get("country", "Ocean / Unknown")

    
    return render_template(
        "home.html",
        latitude=latitude,
        longitude=longitude,
        altitude=altitude,
        velocity=velocity,
        visibility=visibility,
        country=country,
        astronauts=astronauts
    )

@app.route("/astronauts")
def astronauts_page():

    return render_template(
        "astronauts.html",
        astronauts=astronauts
    )

@app.route("/about")
def about():

    return render_template("about.html")

@app.route("/iss-data")
def iss_data():

    url = "https://api.wheretheiss.at/v1/satellites/25544"

    response = requests.get(url)

    # response = requests.get(url, verify=False)

    data = response.json()

    latitude = round(data["latitude"],2)
    longitude = round(data["longitude"],2)
    altitude = round(data["altitude"],2)
    velocity = round(data["velocity"],2)
    visibility = data["visibility"]

    return jsonify({

        "latitude": latitude,

        "longitude": longitude,

        "altitude": altitude,

        "velocity": velocity,

        "visibility": visibility

    })




if __name__=="__main__":
    app.run(debug=True)