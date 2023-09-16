import os

from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from backend.Embeddings import VectorDatabase
from multiprocessing import Pool


class Runner:

    def __init__(self):
        self.llm = ChatOpenAI(model_name="gpt-3.5-turbo")
        self.vdb = VectorDatabase()

    def generate_markdown(self, path_to_epub, prompt):
        # Vectorize the chapters in the book and returns the number of chapters
        num_chapters = self.vdb.add_chapters_from_epub(path_to_epub)

        os.makedirs("cache/" + os.path.basename(path_to_epub), exist_ok=True)

        for i in range(num_chapters):
            chat_history = []
            qa = ConversationalRetrievalChain.from_llm(self.llm, retriever=self.vdb.load_index(
                os.path.basename(path_to_epub) + "/Chapter " + str(i)).as_retriever())
            result = qa({"question": prompt, "chat_history": chat_history})
            with open("cache/" + os.path.basename(path_to_epub) + "/" + str(i) + ".md", "w+") as f:
                f.write(str(result["answer"]))


# llm = ChatOpenAI(model_name="gpt-3.5-turbo")
# vdb = VectorDatabase()
# def worker(i, path_to_epub, prompt):
#     chat_history = []
#     print("pid: " + str(os.getpid()) + " i: " + str(i) + " path_to_epub: " + path_to_epub + " prompt: " + prompt)
#     qa = ConversationalRetrievalChain.from_llm(llm, retriever=vdb.load_index(
#         os.path.basename(path_to_epub) + "/Chapter " + str(i)).as_retriever())
#     result = qa({"question": prompt, "chat_history": chat_history})
#     with open("cache/" + os.path.basename(path_to_epub) + "/" + str(i) + ".md", "w+") as f:
#         f.write(str(result["answer"]))
#
# def generate_markdown(path_to_epub, prompt):
#     # Vectorize the chapters in the book and returns the number of chapters
#     num_chapters = vdb.add_chapters_from_epub(path_to_epub)
#
#     os.makedirs("cache/" + os.path.basename(path_to_epub), exist_ok=True)
#
#     with Pool() as p:
#         p.starmap(worker, [(i, path_to_epub, prompt) for i in range(num_chapters)])


r = Runner()

r.generate_markdown("../bookdata/python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub", "Restructure this content into its Key Concepts. Under each Key Concept, provide a detailed explanation. Serve the response in Markdown format use (###) to seperate the key concepts.")