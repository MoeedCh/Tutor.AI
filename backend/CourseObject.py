import json
import os
from mdParser import *
from firebaseManager import post_course_to_user
class Course:
    def __init__(self, user,course_name, course_materials, bulletBool, exampleBool, qnaBool):
        self.course_name = course_name
        self.chapters = {}
        self.course_materials = course_materials
        self.bulletBool = bulletBool
        self.exampleBool = exampleBool
        self.qnaBool = qnaBool
        self.user = user


    def add_chapters(self):
        for filename in os.listdir("cache/" + self.course_materials):
            if filename.endswith(".md"):  # specify the type of files, you can remove this line if you want all files
                self.chapters["Chapter " + filename.split(".")[0]] = mdToHtml("cache/" +self.course_materials+ "/" + filename)

    def __str__(self):
        return f"Course name: {self.course_name}, Chapters: {self.chapters}"
    
    def toJSON(self):
        return json.dumps(self, default=lambda obj: obj.__dict__, indent=2)
    def to_dict(self):
        return {
            self.course_name: {
                'user': self.user,
                'course_name': self.course_name,
                'chapters': self.chapters,
                'course_materials': self.course_materials
            }
        }


# # Create an instance of the SampleObject class
# sample_instance = Course("Java for shitters", [])

# sample_instance.add_chapter({"chapter_name":"Chapter1", "key_concepts":["concept1, concept2"]})
# # Print the initial state of the object
# strr = sample_instance.toJSON()
# print(strr)

# c = Course("Joe Mama", "Java for Dummies", "python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub", True, True, True)
#
# c.add_chapters()
#
# print(c.toJSON())
#
# post_course_to_user("Joe Mama", c.to_dict())