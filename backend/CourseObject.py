import json
class Course:
    def __init__(self, course_name, chapters):
        self.course_name = course_name
        self.chapters = chapters

    def add_chapter(self, item):
        self.chapters.append(item)

    def __str__(self):
        return f"Course name: {self.course_name}, Chapters: {self.chapters}"
    
    def toJSON(self):
        return json.dumps(self, default=lambda obj: obj.__dict__, indent=2)

# # Create an instance of the SampleObject class
# sample_instance = Course("Java for shitters", [])

# sample_instance.add_chapter({"chapter_name":"Chapter1", "key_concepts":["concept1, concept2"]})
# # Print the initial state of the object
# strr = sample_instance.toJSON()
# print(strr)

