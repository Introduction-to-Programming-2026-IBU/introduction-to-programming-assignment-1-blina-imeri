// CS50x Week 4 — Filter (Less): helpers.c
// ✏️  YOUR CODE GOES HERE
//
// Implement four image filters:
//   grayscale  → -g flag
//   sepia      → -s flag
//   reflect    → -r flag
//   blur       → -b flag

#include "helpers.h"
#include <math.h>
#include <stdlib.h>
#include <string.h>

// ---------------------------------------------------------------------------
// TODO 1: GRAYSCALE
// ---------------------------------------------------------------------------
// Convert each pixel to a shade of grey.
//
// Algorithm:
//   For every pixel, compute the average of its R, G, B values:
//     average = round((R + G + B) / 3.0)
//   Then set R = G = B = average.
//
// HINT: Use round() from <math.h> to avoid truncation.
// HINT: The RGBTRIPLE values are bytes (0–255). Make sure you don't overflow
//       during the sum — cast to int or float first.
//
// Example:
//   Pixel (90, 180, 45)  →  average = round(315/3.0) = 105
//   Result: (105, 105, 105)
// ---------------------------------------------------------------------------
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // TODO: compute the average of R, G, B
            int average = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0);
            // TODO: assign average to all three channels of image[i][j]
            image[i][j].rgbtRed = average;
            image[i][j].rgbtGreen = average;
            image[i][j].rgbtBlue = average;
        }
    }
}

// ---------------------------------------------------------------------------
// TODO 2: SEPIA
// ---------------------------------------------------------------------------
// Apply a warm sepia tone to the image.
//
// Sepia formulas (from CS50 spec):
//   sepiaRed   = round(0.393 * originalRed + 0.769 * originalGreen + 0.189 * originalBlue)
//   sepiaGreen = round(0.349 * originalRed + 0.686 * originalGreen + 0.168 * originalBlue)
//   sepiaBlue  = round(0.272 * originalRed + 0.534 * originalGreen + 0.131 * originalBlue)
//
// IMPORTANT: If any value exceeds 255, cap it at 255.
// HINT: Save the original R, G, B values FIRST before overwriting.
//
// Example:
//   Original (100, 150, 200)
//   sepiaRed   = round(0.393*100 + 0.769*150 + 0.189*200) = round(192.35) = 192
//   sepiaGreen = round(0.349*100 + 0.686*150 + 0.168*200) = round(171.8)  = 172
//   sepiaBlue  = round(0.272*100 + 0.534*150 + 0.131*200) = round(133.4)  = 133
// ---------------------------------------------------------------------------
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
                int originalRed = image[i][j].rgbtRed;
                int originalGreen = image[i][j].rgbtGreen;
                int originalBlue = image[i][j].rgbtBlue;
    
                int sepiaRed = round(0.393 * originalRed + 0.769 * originalGreen + 0.189 * originalBlue);
                int sepiaGreen = round(0.349 * originalRed + 0.686 * originalGreen + 0.168 * originalBlue);
                int sepiaBlue = round(0.272 * originalRed + 0.534 * originalGreen + 0.131 * originalBlue);
    
                if (sepiaRed > 255)
                {
                    sepiaRed = 255;
                }
                if (sepiaGreen > 255)
                {
                    sepiaGreen = 255;
                }
                if (sepiaBlue > 255)
                {
                    sepiaBlue = 255;
                }
    
                image[i][j].rgbtRed = sepiaRed;
                image[i][j].rgbtGreen = sepiaGreen;
                image[i][j].rgbtBlue = sepiaBlue;
        }
    }
}

// ---------------------------------------------------------------------------
// TODO 3: REFLECT
// ---------------------------------------------------------------------------
// Flip the image horizontally (mirror left ↔ right).
//
// Algorithm:
//   For each row, swap image[i][j] with image[i][width - 1 - j]
//   Only iterate j up to width / 2 (otherwise you swap back!)
//
// HINT: Use a temporary RGBTRIPLE variable to do the swap.
//
// Example (row of 4 pixels: A B C D):
//   j=0: swap A ↔ D  →  D B C A
//   j=1: swap B ↔ C  →  D C B A
//   j=2: stop (j < width/2 = 2)
// ---------------------------------------------------------------------------
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width / 2; j++)
        {
            RGBTRIPLE temp = image[i][j];
            image[i][j] = image[i][width - 1 - j];
            image[i][width - 1 - j] = temp;
        }
    }
}

// ---------------------------------------------------------------------------
// TODO 4: BLUR
// ---------------------------------------------------------------------------
// Apply a box blur (average of surrounding 3×3 neighbourhood).
//
// Algorithm:
//   1. Make a FULL COPY of the image first (so you always read original values)
//   2. For each pixel (i, j):
//      a. Look at all pixels in the 3×3 box centred on (i, j)
//      b. Skip neighbours that are out of bounds (off the edges)
//      c. Sum R, G, B values and count valid neighbours
//      d. Divide sums by count, round, and assign to image[i][j]
//
// HINT: Nested inner loops: for (di = -1; di <= 1; di++) for (dj = -1; ...)
// HINT: Check bounds: (i+di >= 0 && i+di < height && j+dj >= 0 && j+dj < width)
// HINT: Use floats for the sums and round() for the final division.
// WARNING: Do NOT modify image[][] while iterating — use the copy to read from!
//
// Example (pixel at a corner has only 4 neighbours including itself):
//   image[0][0]: only checks [0][0], [0][1], [1][0], [1][1] → average of 4
// ---------------------------------------------------------------------------
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // TODO: declare a copy of the image
    //   RGBTRIPLE copy[height][width];
    //   memcpy(copy, image, sizeof(image[0][0]) * height * width);
        RGBTRIPLE(*copy)[width] = calloc(height, width * sizeof(RGBTRIPLE));
        if (copy == NULL)
        {
            fprintf(stderr, "Not enough memory to store image copy.\n");
            return;
        }
        memcpy(copy, image, sizeof(RGBTRIPLE) * height * width);
    
    // TODO: outer loops over each pixel (i, j)
    //   For each pixel:
    //     - initialize sum_r, sum_g, sum_b = 0.0 and count = 0
    //     - inner loops di = -1..1, dj = -1..1
    //       - check bounds
    //       - accumulate copy[i+di][j+dj] channels into sums, increment count
    //     - assign round(sum / count) to image[i][j] channels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float sum_r = 0.0;
            float sum_g = 0.0;
            float sum_b = 0.0;
            int count = 0;

            for (int di = -1; di <= 1; di++)
            {
                for (int dj = -1; dj <= 1; dj++)
                {
                    int ni = i + di;
                    int nj = j + dj;

                    if (ni >= 0 && ni < height && nj >= 0 && nj < width)
                    {
                        sum_r += copy[ni][nj].rgbtRed;
                        sum_g += copy[ni][nj].rgbtGreen;
                        sum_b += copy[ni][nj].rgbtBlue;
                        count++;
                    }
                }
            }

            image[i][j].rgbtRed = round(sum_r / count);
            image[i][j].rgbtGreen = round(sum_g / count);
            image[i][j].rgbtBlue = round(sum_b / count);
        }
    }
    free(copy);
}