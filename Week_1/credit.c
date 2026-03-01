#include<cs50.h>
#include<stdio.h>
#include<string.h>
#include<ctype.h>

int main(void)
{
	int length=0, sum=0;
    string card;

	printf("Enter you card number without spaces:\n");	
	scanf("%s", card);
	
    for(int i=0; i<16; i++)
	{
		if(isdigit(card[i])) length++;
	}
	
	if(length==0)
	{
		printf("You have an invalid credit card!");
	}
	else
	{
		for(int i=length-1; i>0; i-=2)		//checking the first step with doubling digits
		{
			int digit = card[i] - '0';
            int doubled = digit * 2;
            
			if(doubled>10)
				sum+=doubled;
			
			else
				sum=(doubled*10)+(doubled/10);
		}
		
		for(int i=0; i<=length; i+=2)		//second step of checking if its valid
		{
			sum+=card[i];
		}
		
		
	    if(length == 15 && card[0] == 3 && (card[1] == 4 || card[1] == 7))
		    printf("You have an AMEX card type!");

	    else if(length == 16 && card[0] == 5 && card[1] >= 1 && card[1] <= 5)
		    printf("You have a mastercard!");

	    else if((length == 13 || length == 16) && card[0] == 4)
		    printf("you have a Visa card!");

	    else
		    printf("You have an invalid credit card!");
    }
    return 0;
}