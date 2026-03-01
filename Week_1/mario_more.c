#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height;

    do
    {
        printf("How high do you want the pyramid to be? -");
        scanf("%i", &height);

    }
    while (height<0 || height>9);

    for (int row = 1; row <= height; row++)
    {
        for(int spaces = 0; spaces < height - row; spaces++)
        {
            printf(" "); 
        }
        for(int i=0; i<row; i++)
	    {
		printf("#");
	    }
        printf("  ");
        for(int i=0; i<row; i++)
	    {
		    printf("#");
	    }        
        printf("\n");
    }

    return 0;
}