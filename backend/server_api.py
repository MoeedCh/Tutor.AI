import json
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

JSON_FOLDER = 'user_requests'
os.makedirs(JSON_FOLDER, exist_ok=True)

# Home endpoint
@app.route('/')
def home():
    return "Tutor.AI Server"

# Generate Course endpoint
@app.route('/api/generate_course', methods=['POST'])
def generate_course():
    try:
        # Get JSON Data from the request
        request_data = request.get_json()

        # Check if the JSON data is present in the request
        if request_data:
            # Generate a unique filename
            filename_key = request_data['course_name']
            filename = os.path.join(JSON_FOLDER, f'{filename_key}.json')

            # Save the JSON data to a file locally
            with open(filename, 'w') as json_file:
                json_file.write(json.dumps(request_data))

            return "Success", 200
        else:
            return jsonify({'error': 'No JSON data provided in the request'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=1234, debug=True)
