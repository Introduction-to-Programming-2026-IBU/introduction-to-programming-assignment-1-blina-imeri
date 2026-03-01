#include <cs50.h>
#include <stdio.h>

int get_cents(void);
int calculate_quarters(int cents);
int calculate_dimes(int cents);
int calculate_nickels(int cents);
int calculate_pennies(int cents);

int main(void)
{
    int cents = get_cents();

    int quarters = calculate_quarters(cents);
    cents -= quarters * 25;

    int dimes = calculate_dimes(cents);
    cents -= dimes * 10;

    int nickels = calculate_nickels(cents);
    cents -= nickels * 5;

    int pennies = calculate_pennies(cents); //we can do int pennies=cents;

    printf("%i\n", quarters + dimes + nickels + pennies);

	return 0;
}


int get_cents(void)
{
	int change;

	do
	{
		change=get_int("Change owed: ");
	}
	while(change<0);
           

    return change;

}

int calculate_quarters(int cents)
{
	return cents/25;
}

int calculate_dimes(int cents)
{
	return cents/10;
}

int calculate_nickels(int cents)
{
	return cents/5;
}

int calculate_pennies(int cents)
{
	return cents;			//We don't need this function since pennies=1 but you have added it so I'll keep it!
}