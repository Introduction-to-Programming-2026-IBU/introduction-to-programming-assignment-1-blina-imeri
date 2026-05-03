# Project 1 — Temperature Converter
# Author: Blina Imeri
# Date:   31.03.2026
#
# Instructions:
#   1. Read the README.md in this folder first.
#   2. Fill in the missing lines below.
#   3. Test with: 0°C → 32°F | 100°C → 212°F | -40°C → -40°F

# ── Your solution goes here ───────────────────────────────────────────────────

celsius = float(input("Enter temperature in Celsius: "))

# TODO: calculate fahrenheit using the formula F = (C × 9/5) + 32
fahrenheit = (celsius * 9/5) + 32

# TODO: print the result using an f-string
print(f"{celsius}°C is equal to {fahrenheit}°F")

# ── Bonus (optional) ─────────────────────────────────────────────────────────
# Add a direction menu (C→F or F→C)
print("Select conversion direction:")
print("1: Celsius to Fahrenheit")
print("2: Fahrenheit to Celsius")
choice = input("Enter 1 or 2: ")

if choice == "1":
    celcius = float(input("Enter temperature in Celsius: "))
    fahrenheit = (celcius * 9/5) + 32
    print(f"{celcius}°C is equal to {fahrenheit}°F")
elif choice == '2':
    fahrenheit = float(input("Enter temperature in Fahrenheit: "))
    celcius = (fahrenheit - 32) * 5/9
    print(f"{fahrenheit}°F is equal to {celcius}°C")
else:
    print("Invalid choice. Please enter 1 or 2.")
