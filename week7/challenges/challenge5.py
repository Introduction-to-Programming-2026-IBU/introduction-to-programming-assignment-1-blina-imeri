# challenge5.py — Data Cleaner
# Read a messy CSV, detect problems, write a cleaned version, print a report.
# Create your own messy_data.csv with intentional errors to test against.

import csv

# Your code here
with open('messy_data.csv', mode='r', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    cleaned_data = []
    report = {
        'total_rows': 0,
        'cleaned_rows': 0,
        'errors': []
    }
    
    for row in reader:
        report['total_rows'] += 1
        cleaned_row = {}
        row_errors = []
        
        # Example cleaning: Check for missing values and convert to appropriate types
        for key, value in row.items():
            if value == '':
                row_errors.append(f'Missing value in column "{key}"')
                cleaned_row[key] = None
            else:
                # Attempt to convert to int if possible
                try:
                    cleaned_row[key] = int(value)
                except ValueError:
                    cleaned_row[key] = value
        
        if row_errors:
            report['errors'].append({'row': report['total_rows'], 'issues': row_errors})
        else:
            report['cleaned_rows'] += 1
        
        cleaned_data.append(cleaned_row)

# cleaned data to a new CSV
with open('cleaned_data.csv', mode='w', newline='') as csvfile:
    fieldnames = cleaned_data[0].keys() if cleaned_data else []
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(cleaned_data)

# Printing the report
print("Data Cleaning Report:")
print(f"Total rows processed: {report['total_rows']}")
print(f"Cleaned rows: {report['cleaned_rows']}")
if report['errors']:
    print("Errors found:")
    for error in report['errors']:
        print(f"Row {error['row']}: {', '.join(error['issues'])}")
else:    print("No errors found.")  

