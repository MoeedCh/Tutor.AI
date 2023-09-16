import os

from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from backend.Embeddings import VectorDatabase


# class Runner:
#
#     def __init__(self):
#         self.llm = ChatOpenAI(model_name="gpt-3.5-turbo")
#         self.vdb = VectorDatabase()
#
#     def generate_markdown(self, path_to_epub, prompt):
#         # Vectorize the chapters in the book and returns the number of chapters
#         num_chapters = self.vdb.add_chapters_from_epub(path_to_epub)
#
#         os.makedirs("cache/" + os.path.basename(path_to_epub), exist_ok=True)
#
#         for i in range(num_chapters):
#             chat_history = []
#             qa = ConversationalRetrievalChain.from_llm(self.llm, retriever=self.vdb.load_index(
#                 os.path.basename(path_to_epub) + "/Chapter " + str(i)).as_retriever())
#             result = qa({"question": prompt, "chat_history": chat_history})
#             with open("cache/" + os.path.basename(path_to_epub) + "/" + str(i) + ".md", "w+") as f:
#                 f.write(str(result["answer"]))


import multiprocessing


llm = ChatOpenAI(model_name="gpt-3.5-turbo")
vdb = VectorDatabase()
def process_chapter(path_to_epub, prompt, chapter_index):
    chat_history = []
    qa = ConversationalRetrievalChain.from_llm(llm, retriever=vdb.load_index(
        os.path.basename(path_to_epub) + "/Chapter " + str(chapter_index)).as_retriever())
    result = qa({"question": prompt, "chat_history": chat_history})
    with open("cache/" + os.path.basename(path_to_epub) + "/" + str(chapter_index) + ".md", "w+") as f:
        f.write(str(result["answer"]))

def generate_markdown(path_to_epub, prompt):
    #num_chapters = vdb.add_chapters_from_epub(path_to_epub)
    os.makedirs("cache/" + os.path.basename(path_to_epub), exist_ok=True)

    processes = []
    for i in range(10):
        p = multiprocessing.Process(target=process_chapter, args=(path_to_epub, prompt, i))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

def choosePrompt(bulletBool, exampleBool, qnaBool):
    modifier = ""
    modifiers_dict = {"bullet":" in bulleted form", "example":" provide examples (if applicable)", "qna":" and provide a thoughtful question at the end"}
    
    if (bulletBool):
        modifier += modifiers_dict['bullet']
    elif (exampleBool):
        modifier += modifiers_dict['example']
    elif (qnaBool):
        modifier += modifiers_dict['qna']

    return f"Restructure this content into its Key Concepts. Under each Key Concept, provide a detailed explanation{modifier}. Serve the response in Markdown format, use (#) to seperate the key concepts."

# r = Runner()
if __name__ == "__main__":
    generate_markdown("../bookdata/python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub", choosePrompt(False, False, True))