import json
import os
from mdParser import *
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

    def add_chapter(self, chapter_file_name):
        self.chapters["Chapter " + chapter_file_name.split(".")[0]] = mdToHtml("cache/" +self.course_materials+ "/" + chapter_file_name)

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


