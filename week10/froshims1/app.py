# Implements a registration form using a select menu, validating sport server-side

# TODO: Import Flask, render_template, and request from the flask package

import flask
from flask import render_template, request

# TODO: Create the Flask app instance
app = flask.Flask(__name__)

# TODO: Define a SPORTS list containing at least 3 sport names
SPORTS = ["Basketball", "Soccer", "Tennis"]

# TODO: Define a GET route for "/" that renders index.html
#       Pass the SPORTS list to the template as the variable "sports"
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", sports=SPORTS)

# TODO: Define a POST route for "/register" that:
#         - Reads "name" from the form
#         - Reads "sport" from the form
#         - If name is missing OR sport is not in the SPORTS list → render failure.html
#         - Otherwise → render success.html
@app.route("/register", methods=["POST"])
def register():
    name = request.form.get("name")
    sport = request.form.get("sport")

    if not name or sport not in SPORTS:
        return render_template("failure.html")
    else:
        return render_template("success.html", name=name, sport=sport)
