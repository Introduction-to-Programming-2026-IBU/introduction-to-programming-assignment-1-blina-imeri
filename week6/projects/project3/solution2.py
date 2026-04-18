# Project 3 — Grade Calculator
# Author: Blina Imeri

scores = []

# TODO: use a for loop to collect 5 scores and append each to the list

for _ in range(5):
    scores.append(float(input("Enter a score: ")))

# TODO: calculate the average using sum() and len()

average = sum(scores) / len(scores)

# TODO: determine the grade with if/elif/else (A/B/C/D/F)

match average:
    case _ if _ >= 90:
        grade = "A"
    case _ if _ >= 80:
        grade = "B"
    case _ if _ >= 70:
        grade = "C"
    case _ if _ >= 60:
        grade = "D"
    case _:
        grade = "F"

# TODO: print the average (1 decimal place) and the grade
#   Hint: f"{average:.1f}" formats to 1 decimal place
print(f"Average: {average:.1f}, Grade: {grade}")