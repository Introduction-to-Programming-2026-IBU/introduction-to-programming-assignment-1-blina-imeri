# Project 5 — Mini Shopping Cart
# Author: Blina Imeri

menu = {
    1: ("Apple",  0.50),
    2: ("Banana", 0.30),
    3: ("Milk",   1.20),
    4: ("Bread",  2.00),
}

cart  = {}   # { item_name: quantity }
total = 0.0

# TODO: display the menu
print("--- Shop Menu ---")
for number, (name, price) in menu.items():
    print(f"{number}. {name:<10} ${price:.2f}")
print("5. Done")

# TODO: shopping loop
 while True:
    choice = int(input("\nChoose an item (1-5): "))
    if choice == 5:
        break
    if choice in menu:
        item_name, item_price = menu[choice]
        quantity = int(input(f"How many {item_name}s would you like to buy? "))
        if item_name in cart:
            cart[item_name] += quantity
        else:
            cart[item_name] = quantity
        total += item_price * quantity
    else:
        print("Invalid choice, try again.")

# TODO: print the receipt
print("\n--- Receipt ---")
for item, qty in cart.items():
    print(f"{item}: {qty}")
print(f"Total: ${total:.2f}")
print("Thank you!")
