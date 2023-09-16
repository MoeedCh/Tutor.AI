import ebooklib
from bs4 import BeautifulSoup
from ebooklib import epub

from backend.Database import VectorDatabase, BookDatabase


def split_epub_to_chapters(file_path):
    book = epub.read_epub(file_path)
    chapters = []
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            chapters.append(item.get_content())
    return chapters



chatpers = split_epub_to_chapters("../bookdata/Dune{Frank_Herbert}.epub")

soup = BeautifulSoup(chatpers[7], "html.parser")

with open("test.txt", "w") as f:
    f.write(soup.get_text())


print(soup.get_text())

vector = VectorDatabase()
db = BookDatabase("books.db")

vector.add_txt("test.txt")
book_id = db.add_book("chapter 1", "F scott", "greatgatsby", "test.txt")
vector.create_index(
    "chapter 1", vector.add_txt("test.txt")
)


