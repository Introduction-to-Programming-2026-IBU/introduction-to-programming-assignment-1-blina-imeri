# challenge2.py — Two-Column Report
# Read favorites.csv, find the most common problem per language, print a table.

import csv

# Your code here
with open('favorites.csv') as f:
    reader = csv.reader(f)
    next(reader)  # Skip header row

    language_problems = {}

    for row in reader:
        _, language, problem = row
        if language not in language_problems:
            language_problems[language] = {}
        if problem not in language_problems[language]:
            language_problems[language][problem] = 0
        language_problems[language][problem] += 1

    print(f"{'Language':<20} {'Most Common Problem':<20}")
    print("-" * 40)

    for language, problems in language_problems.items():
        most_common_problem = max(problems, key=problems.get)
        print(f"{language:<20} {most_common_problem:<20}")
