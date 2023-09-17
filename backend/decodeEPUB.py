import base64
import json

json_file_path = 'output.json'
def decode_book(epub_data, book_name):

    # Replace 'base64_encoded_data_here' with your actual base64-encoded EPUB data
    base64_encoded_data = epub_data

    # Decode the base64-encoded data
    decoded_data = base64.b64decode(base64_encoded_data)

    # Write the decoded data to the output file
    with open(f"../bookdata/{book_name}", 'wb') as output_file:
        output_file.write(decoded_data)

    print(f"EPUB file decoded and saved as {book_name}")