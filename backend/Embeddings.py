import sqlite3
import os
from langchain import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import TextLoader, PyPDFLoader, UnstructuredEPubLoader
from langchain.embeddings import GPT4AllEmbeddings
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter

import hashlib
import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup


# Load in env variables
from dotenv import load_dotenv

load_dotenv()

class VectorDatabase:
    def __init__(self, embeddings=GPT4AllEmbeddings()):
        self.embeddings = embeddings

    def create_index(self, index_name, folder, split_text):
        for i in split_text:
            db = None
            if isinstance(split_text[0], str):
                db = FAISS.from_texts(split_text, self.embeddings)
            else:
                db = FAISS.from_documents(split_text, self.embeddings)
            db.save_local("faiss_db/" + folder, index_name=index_name)

    def load_index(self, index_name):
        db = FAISS.load_local(
            "faiss_db", index_name=index_name, embeddings=self.embeddings
        )
        return db

    # def split_text(self, loader, chunk_size=1000, chunk_overlap=0):
    #     documents = []
    #     for l in loader:
    #         text_splitter = CharacterTextSplitter(
    #             chunk_size=chunk_size, chunk_overlap=chunk_overlap
    #         )
    #         if isinstance(l, str):
    #             documents.append(text_splitter.split_text(l))
    #         else:
    #             documents.append(text_splitter.split_documents(l))
    #     return documents


    def split_text(self, loader, max_chunk_size=2000):
        documents = []
        for l in loader:
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=max_chunk_size, chunk_overlap=0)
            if isinstance(l, str):
                documents.append(text_splitter.split_text(l))
            else:
                documents.append(text_splitter.split_documents(l))
        return documents

    def add_epub(self, epub_path):
        book = epub.read_epub(epub_path)
        text = []
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                soup = BeautifulSoup(item.get_content(), "html.parser")
                #text += soup.get_text()
                t = soup.get_text().strip()
                if t == "":
                    continue
                text.append(soup.get_text().strip())
        loader = text
        return self.split_text(loader)


    def add_chapters_from_epub(self, epub_path):
        split_epub = self.add_epub(epub_path)
        i = 0
        for i in range(len(split_epub)):
            print("Creating index for chapter " + str(i))
            self.create_index("Chapter " + str(i), os.path.basename(epub_path),split_epub[i])
        return i

# vdb = VectorDatabase()
# print(vdb.add_chapters_from_epub("../bookdata/Dune{Frank_Herbert}.epub"))
#
# llm = ChatOpenAI(model_name="gpt-3.5-turbo")
#
# qa = ConversationalRetrievalChain.from_llm(llm, retriever=vdb.load_index("2018FundamentalsOfCppProgramming_2018_fundamentals-of-cpp-programming.epub/Chapter 22").as_retriever())
# #question = "Restructure this content into its Key Concepts. Under each Key Concept, provide a detailed explanation. Serve the response in Markdown format."
# chat_history = []
# import json
# json = json.load(open("Prompts.json"))
# question = json["Prompts"]["ExamplePrompt"]
# result = qa({"question": question, "chat_history": chat_history})
# chat_history.append((question, result["answer"]))
# print(f"Question: \n {question} \n")
# print(f"Answer: \n {result['answer']} \n")
# print("------------------------------------------------------- \n")
