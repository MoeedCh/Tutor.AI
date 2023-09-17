import base64
import json

json_file_path = 'output.json'

with open(json_file_path, 'r') as json_file:
    json_data = json_file.read()

    # Parse the JSON data into a Python dictionary
    json_dict = json.loads(json_data)

    # Access the "epubData" value in the dictionary
    epub_data = json_dict["epubData"]

    # Replace 'base64_encoded_data_here' with your actual base64-encoded EPUB data
    base64_encoded_data = epub_data

    # Decode the base64-encoded data
    decoded_data = base64.b64decode(base64_encoded_data)

    # Specify the path where you want to save the EPUB file
    output_file_path = 'output.epub'

    # Write the decoded data to the output file
    with open(output_file_path, 'wb') as output_file:
        output_file.write(decoded_data)

    print(f"EPUB file decoded and saved as {output_file_path}")
