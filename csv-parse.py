import csv
import json
from collections import Counter

def process_csv_file(input_csv, output_json):
    # initialize our counter
    county_counts = Counter()

    try:
        # open the file
        with open(input_csv, mode='r', encoding='utf-8') as csvfile:
            # parse the CSV, handling the quotes automatically
            reader = csv.DictReader(csvfile)
            
            for row in reader:
                # get the raw county data ("Marion [IN], Boone [IN]")
                raw_counties = row.get("Counties/Parishes", "")
                
                if not raw_counties:
                    continue

                # split the string every time there is a comma
                # to support warnings across multiple counties
                entries = raw_counties.split(',')

                for entry in entries:
                    # clean
                    clean_name = entry.strip()
                    
                    # remove the " [IN]" part
                    clean_name = clean_name.replace(" [IN]", "")
                    
                    # make everything lowercase
                    clean_name = clean_name.lower()
                    
                    # count em up
                    if clean_name:
                        county_counts[clean_name] += 1

        # convert our Counter() to a dict for JSON support
        final_data = dict(county_counts)

        # write output as json data
        with open(output_json, 'w', encoding='utf-8') as jsonfile:
            json.dump(final_data, jsonfile, indent=4)
        
        print(f"Success! Processed {len(final_data)} unique counties.")
        print(f"Data saved to {output_json}")

    # handle for errors
    except FileNotFoundError:
        print(f"Error: could not find file '{input_csv}'. Is it in the same directory ?")
    except Exception as e:
        print(f"something else blew up: {e}")

# run function when script runs
process_csv_file('warnings.csv', 'counties.json')