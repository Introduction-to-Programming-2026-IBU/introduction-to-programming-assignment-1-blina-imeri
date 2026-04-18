# challenge4.py — SQL Explorer
# Present an interactive menu that runs different SQL queries on favorites.db.
# Requires favorites.db — see week2/README.md for setup instructions.

import sqlite3

# Your code here
def main():
    conn = sqlite3.connect('favorites.db')
    cursor = conn.cursor()

    while True:
        print("\nMenu:")
        print("1. View all favorites")
        print("2. Add a new favorite")
        print("3. Delete a favorite")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            cursor.execute("SELECT * FROM favorites")
            favorites = cursor.fetchall()
            for fav in favorites:
                print(fav)
        elif choice == '2':
            name = input("Enter the name of the favorite: ")
            category = input("Enter the category of the favorite: ")
            cursor.execute("INSERT INTO favorites (name, category) VALUES (?, ?)", (name, category))
            conn.commit()
            print("Favorite added.")
        elif choice == '3':
            fav_id = input("Enter the ID of the favorite to delete: ")
            cursor.execute("DELETE FROM favorites WHERE id = ?", (fav_id,))
            conn.commit()
            print("Favorite deleted.")
        elif choice == '4':
            break
        else:
            print("Invalid choice. Please try again.")

    conn.close()
if __name__ == "__main__":
    main()
    
