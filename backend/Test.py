import ebooklib
from bs4 import BeautifulSoup
from ebooklib import epub

def split_epub_to_chapters(file_path):
    book = epub.read_epub(file_path)
    chapters = []
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            chapters.append((item.get_name(), item.get_content()))
    return chapters



chatpers = split_epub_to_chapters("../bookdata/python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub")

soup = BeautifulSoup(chatpers[5], "html.parser")

print(soup.get_text())


