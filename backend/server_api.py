import json
import time

from flask import Flask, request, jsonify
from CourseObject import *
from flask_cors import CORS
from ProcessPool import ProcessPool

from Embeddings import *
#from backend.firebaseManager import post_course_to_user

load_dotenv()
# Home endpoint

app = Flask(__name__)
cors = CORS(app)
JSON_FOLDER = 'user_requests'

os.makedirs(JSON_FOLDER, exist_ok=True)


def run_flask_app():
    app.run(host='localhost', port=1234, debug=True)


@app.route('/')
def home():
    return "Tutor.AI Server"


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
            start_time = time.time()
            c = Course(user, course_name, course_materials, bulletBool, exampleBool, qnaBool)
            add_epub("../bookdata/" + course_materials, pool, c)

            end_time = time.time()
            elapsed_time = end_time - start_time
            print(f"Time elapsed: {elapsed_time} seconds")
            post_course_to_user(user, c.to_dict())

            return "Success", 200
        else:
            return jsonify({'error': 'No JSON data provided in the request'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':


    pool = ProcessPool()
    app.run(host='localhost', port=1234, debug=True)

    pool.close()