#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int compute_score(string word);

int main(void)
{   
    // Get input words from both players
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    // Computing scores for each player
    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    if (score1 > score2) 
        printf("Player 1 wins!\n");
    else if (score2 > score1) 
        printf("Player 2 wins!\n");
    else 
        printf("Tie!\n");
}

int compute_score(string word)
{
    int score = 0;
    char one[10] = "AEIOULNSTR";
    char two[2] = "DG";
    char three[4] = "BCMP";
    char four[5] = "FHVWY";
    char five[1] = "K";
    char eight[2] = "JX";
    char ten[2] = "QZ";
    
    for (int i = 0; i < strlen(word); i++)
    {
        if (isalpha(word[i]))
        {
            char c;
            if (islower(word[i])) c = toupper(word[i]);
            if (strchr(one, c))
                score += 1;
            else if (strchr(two, c))
                score += 2;
            else if (strchr(three, c))
                score += 3;
            else if (strchr(four, c))
                score += 4;
            else if (strchr(five, c))
                score += 5;
            else if (strchr(eight, c))
                score += 8;
            else if (strchr(ten, c))
                score += 10;
        }
    }

    return score;
}