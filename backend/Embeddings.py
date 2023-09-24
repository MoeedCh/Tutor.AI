import os
import time
import lxml.html
from langchain import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import GPT4AllEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
import ebooklib
from ebooklib import epub
# Load in env variables
from dotenv import load_dotenv

from CourseObject import *
from ProcessPool import ProcessPool
from backend.firebaseManager import post_course_to_user

load_dotenv()

llm = ChatOpenAI(model_name="gpt-3.5-turbo")
embeddings = GPT4AllEmbeddings()




def create_index(index_name, folder, split_text):
    for i in split_text:
        db = None
        if isinstance(split_text[0], str):
            db = FAISS.from_texts(split_text, embeddings)
        else:
            db = FAISS.from_documents(split_text, embeddings)
        db.save_local("faiss_db/" + folder, index_name=index_name)

def load_index(index_name):
    db = FAISS.load_local(
        "faiss_db", index_name=index_name, embeddings=embeddings
    )
    return db

def split_text(loader, max_chunk_size=2000):
    documents = []
    for l in loader:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=max_chunk_size, chunk_overlap=0)
        if isinstance(l, str):
            documents.append(text_splitter.split_text(l))
        else:
            documents.append(text_splitter.split_documents(l))
    return documents

def create_chapter(chapter_name, epub_name, text, course):
    #soup = BeautifulSoup(text, "html.parser")
    tree = lxml.html.fromstring(text)
    #t = soup.get_text().strip() # Remove whitespace
    t = tree.text_content().strip() # Remove whitespace

    if t == "":
        return None
    documents = split_text([t])[0]  # Flatten the list of lists

    create_index(chapter_name, epub_name, documents)
    process_chapter(epub_name,choosePrompt(True,False,False),chapter_name)
    course.add_chapters()
    post_course_to_user(course.user, course.to_dict())


def process_chapter(path_to_epub, prompt, chapter_index):
    chat_history = []
    qa = ConversationalRetrievalChain.from_llm(llm, retriever=load_index(
        os.path.basename(path_to_epub) + "/" + str(chapter_index)).as_retriever())
    result = qa({"question": prompt, "chat_history": chat_history})
    os.makedirs("cache/" + os.path.basename(path_to_epub), exist_ok=True)

    with open("cache/" + os.path.basename(path_to_epub) + "/" + str(chapter_index) + ".md", "w+") as f:
        f.write(str(result["answer"]))
        f.close()

    return result["answer"]


def add_epub(epub_path, pool, course):

    book = epub.read_epub(epub_path)
    text = []
    name = os.path.basename(epub_path)
    i = 0
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            pool.submit_task(create_chapter,(str(i),name, item.get_content(), course), 1)
            i += 1



def choosePrompt(bulletBool, exampleBool, qnaBool):
    modifier = ""
    modifiers_dict = {"bullet": " in bulleted form", "example": " provide examples (if applicable)",
                      "qna": " and provide a thoughtful question at the end"}

    if (bulletBool):
        modifier += modifiers_dict['bullet']
    elif (exampleBool):
        modifier += modifiers_dict['example']
    elif (qnaBool):
        modifier += modifiers_dict['qna']

    return f"Restructure this content into its Key Concepts. Under each Key Concept, provide a detailed explanation{modifier}. Serve the response in Markdown format, use (#) to seperate the key concepts and format the rest appropriately"


#if __name__ == "__main__":
def main():
    #pool = ProcessPool()
    #pool.start_workers()
    start_time = time.time()

    pool = ProcessPool()
    user_info = {"user":"Andrew", "course_name":"JavaScript", "course_materials":"Java_Script.epub", "bulletBool":True, "exampleBool":False, "qnaBool":False}
    c = Course(user_info["user"], user_info["course_name"], user_info["course_materials"], user_info["bulletBool"], user_info['exampleBool'], user_info['qnaBool'])
    add_epub("../bookdata/Java_Script.epub", pool,c)

    pool.close()
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Elapsed time: {elapsed_time:.2f} seconds")

import cProfile
import pstats

if __name__ == "__main__":
    # Run cProfile and save the results to a file
    cProfile.run('main()', 'profile_stats')

    # Create a pstats.Stats object from the saved results
    stats = pstats.Stats('profile_stats')

    # Sort the statistics by the desired metric (e.g., total time)
    stats.sort_stats(pstats.SortKey.TIME)

    # Filter and display the top 10 functions by the desired metric
    stats.print_stats(25)