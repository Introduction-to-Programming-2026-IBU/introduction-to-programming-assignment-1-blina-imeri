# Project 2 — Number Guessing Game
# Author: Blina Imeri

import random

# TODO: generate a random secret number between 1 and 10
secret_no = random.randint(1, 10)

# TODO: set up a guesses counter

counter = 0

# TODO: get the user's first guess

guess = int(input("Guess the secret number between 1 and 10: "))

# TODO: while loop — keep asking until the guess is correct
#   - print "Too low!" or "Too high!" on each wrong guess
#   - count each guess

while guess != secret_no:
    if guess < secret_no:
        print("Too low!")
    elif guess > secret_no:
        print("Too high!")
    counter += 1
    guess = int(input("Guess the secret number between 1 and 10: "))

# TODO: print the congratulations message with the number of guesses
print(f"Congratulations! You've guessed the number in {counter} guesses!")