# Stores registrants in a SQLite database

# TODO: Import SQL from cs50
# TODO: Import Flask, redirect, render_template, and request from flask
from cs50 import SQL
from flask import Flask, redirect, render_template, request

# TODO: Create the Flask app instance
app = Flask(__name__)

# TODO: Connect to the SQLite database "froshims.db" using cs50's SQL()
#       and store it in a variable called db

db = SQL("sqlite:///froshims.db")

# TODO: Define the SPORTS list with at least 3 sport names
SPORTS = ["Basketball", "Soccer", "Tennis"]

# TODO: Define a GET route for "/" that renders index.html with sports=SPORTS
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", sports=SPORTS)

# TODO: Define a POST route for "/register" that:
#         1. Validates name (missing → error.html with message="Missing name")
#         2. Validates sport (missing → "Missing sport", not in SPORTS → "Invalid sport")
#         3. Inserts the registrant into the database:
#            db.execute("INSERT INTO registrants (name, sport) VALUES(?, ?)", name, sport)
#         4. Redirects to "/registrants"

@app.route("/register", methods=["POST"])
def register():
    name = request.form.get("name")
    sport = request.form.get("sport")

    if not name:
        return render_template("error.html", message="Missing name")
    elif not sport:
        return render_template("error.html", message="Missing sport")
    elif sport not in SPORTS:
        return render_template("error.html", message="Invalid sport")

    db.execute("INSERT INTO registrants (name, sport) VALUES(?, ?)", name, sport)

    return redirect("/registrants")

# TODO: Define a GET route for "/registrants" that:
#         - Queries all rows from the registrants table
#         - Renders registrants.html passing the results as "registrants"

@app.route("/registrants", methods=["GET"])
def registrants():
    registrants = db.execute("SELECT * FROM registrants")
    return render_template("registrants.html", registrants=registrants)