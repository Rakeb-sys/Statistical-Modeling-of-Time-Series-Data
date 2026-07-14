import csv
from flask import Flask, jsonify

app = Flask(__name__)

CSV_FILE_PATH = "data/event_dataset.csv"

def load_weather_data():
    """Reads the event CSV file dynamically and adapts to whatever columns exist."""
    data = []
    try:
        with open(CSV_FILE_PATH, mode='r', encoding='utf-8-sig') as file:
            csv_reader = csv.DictReader(file)
            
            # Clean up column headers to strip hidden whitespace/Excel artifacts
            csv_reader.fieldnames = [field.strip() for field in csv_reader.fieldnames if field]
            
            for row in csv_reader:
                # Clean whitespace from row values
                cleaned_row = {k.strip(): v.strip() for k, v in row.items() if k is not None}
                
                # Skip completely empty rows
                if not any(cleaned_row.values()):
                    continue
                
                # OPTIONAL: Automatically try to parse numbers so they look clean in JSON
                for key, val in cleaned_row.items():
                    try:
                        if '.' in val:
                            cleaned_row[key] = float(val)
                        else:
                            cleaned_row[key] = int(val)
                    except ValueError:
                        # If it's a string/date, leave it as a string
                        pass
                
                data.append(cleaned_row)
                
    except FileNotFoundError:
        print(f"❌ CRITICAL ERROR: Could not find your CSV file at: {CSV_FILE_PATH}")
    return data

# Route 1: The Home Page (Returns HTML)
@app.route('/')
def index():
    return "<h1>City Weather API</h1><p>Navigate to <b>/api/all</b> to see the data.</p>"

# Route 2: Return All Data (Reads directly from CSV)
@app.route('/api/all')
def get_all_weather():
    weather_db = load_weather_data()  # Fetch fresh data from the CSV
    return jsonify({"status": "success", "data": weather_db})

# Route 3: Dynamic Route (Find city by ID from CSV rows)
@app.route('/api/city/<int:city_id>')
def get_city_by_id(city_id):
    weather_db = load_weather_data()  # Fetch fresh data from the CSV
    
    # Search the list for the matching ID (this logic works perfectly now!)
    result = next((item for item in weather_db if item["id"] == city_id), None)
    
    if result:
        return jsonify({"status": "found", "data": result})
    else:
        return jsonify({"status": "error", "message": "City not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)