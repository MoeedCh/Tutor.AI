import json
from flask import Flask, request, jsonify
import os
from Server import *
from mdParser import *
from CourseObject import *
from firebaseManager import post_course_to_user
from flask_cors import CORS
from decodeEPUB import *

app = Flask(__name__)
cors = CORS(app)
JSON_FOLDER = 'user_requests'
os.makedirs(JSON_FOLDER, exist_ok=True)

# Home endpoint
@app.route('/')
def home():
    return "Tutor.AI Server"

# @app.route('/api/upload_file', methods=['POST'])
# def upload_file():
#     try:
#         # Get JSON Data from the request
#         request_data = request.get_json()

#         # Check if the JSON data is present in the request
#         if request_data:
#             print(request_data)
#             print(type(request_data))
#             return "Success", 200
#         else:
#             return jsonify({'error': 'No JSON data provided in the request'}), 400
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return {'status': 'No file part in the request'}, 400

    file = request.files['file']

    if file.filename == '':
        return {'status': 'No selected file'}, 400

    # If everything is okay, save the file
    file.save('../bookdata/' + file.filename)
    return {'status': 'File uploaded successfully'}

# Generate Course endpoint
@app.route('/api/generate_course', methods=['POST'])
def generate_course():
    try:
        # Get JSON Data from the request
        request_data = request.get_json()

        # Check if the JSON data is present in the request
        if request_data:
            # Generate a unique filename
            user = request_data['user']
            course_name = request_data['course_name']
            course_materials = request_data['course_materials']
            bulletBool = request_data['bulletBool']
            exampleBool = request_data['exampleBool']
            qnaBool = request_data['qnaBool']
            # encoded_book = request_data['epubData']
            # decode_book(encoded_book, course_materials)

            RunBackend(f"bookdata/{course_materials}", bulletBool, exampleBool, qnaBool)

            c = Course(user, course_name, course_materials, bulletBool, exampleBool, qnaBool)
            c.add_chapters()
            post_course_to_user(user, c.to_dict())

            return "Success", 200
        else:
            return jsonify({'error': 'No JSON data provided in the request'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='localhost', port=1234, debug=True)
