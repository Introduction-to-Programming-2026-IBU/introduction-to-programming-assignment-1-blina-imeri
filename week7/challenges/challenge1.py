# challenge1.py — Frequency Filter
# Read favorites.csv, ask for a minimum vote count, print filtered results.
# No starter hints — build this from scratch using what you learned in week1 and week2.

import csv

# Your code here
filename = "favorites.csv"

# Phase 1: Count the occurrences of each language
counts = {}
with open(filename, "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        lang = row["language"]
        if lang in counts:
            counts[lang] += 1
        else:
            counts[lang] = 1

# Phase 2: Get user input for filtering
min_votes = int(input("Enter minimum vote count: "))

# Phase 3: Print only the languages that meet the threshold
print(f"\nLanguages with at least {min_votes} votes:")

for language in counts:
    if counts[language] >= min_votes:
        print(f"{language}: {counts[language]} votes")