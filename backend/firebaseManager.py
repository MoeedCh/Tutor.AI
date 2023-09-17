import os

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("../tutorai-10ef6-firebase-adminsdk-rulbe-cb06a07e9a.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://tutorai-10ef6-default-rtdb.firebaseio.com/"})

from firebase_admin import db

dev_ref = db.reference('dev')

def post_course_to_user(user, course):
    user_ref = dev_ref.child('users').child(user).child('Courses')
    user_ref.update(course)
    print("Course added to user")


def upload_markdown_to_course(user, course, markdown_directory):
    course_ref = dev_ref.child("users").child(user).child('Courses').child(course).child('markdown')
    for filename in os.listdir(markdown_directory):
        chapter_ref = course_ref.child(filename.split(".")[0])
        if filename.endswith(".md"):  # specify the type of files, you can remove this line if you want all files
            with open(os.path.join(markdown_directory, filename), 'r') as f:  # open in readonly mode
                markdown = f.read()  # read file content
                print(markdown)
        markdown = markdown.replace("\n", "\\n")
        course_ref.update({filename.split(".")[0]: markdown})
        print("Markdown added to course")


upload_markdown_to_course("Andrew", 'Intro to Python', 'cache/python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub')