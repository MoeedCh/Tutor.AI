import json
from flask import Flask, request, jsonify
import os
from Server import *
from mdParser import *

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
            course_name = request_data['course_materials']
            bulletBool = request_data['bulletBool']
            exampleBool = request_data['exampleBool']
            qnaBool = request_data['qnaBool']

            RunBackend(course_name, bulletBool, exampleBool, qnaBool)
            

            return "Success", 200
        else:
            return jsonify({'error': 'No JSON data provided in the request'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='localhost', port=1234, debug=True)
