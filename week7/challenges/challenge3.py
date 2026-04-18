# challenge3.py — CSV Writer
# Read favorites.csv, count votes per language, write results to language_summary.csv.

import csv

# Your code here
def count_votes(input_file, output_file):
    language_counts = {}

    with open(input_file, mode='r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            language = row['language']
            if language in language_counts:
                language_counts[language] += 1
            else:
                language_counts[language] = 1

    with open(output_file, mode='w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Language', 'Votes'])
        for language, votes in language_counts.items():
            writer.writerow([language, votes])

count_votes('favorites.csv', 'language_summary.csv')    
